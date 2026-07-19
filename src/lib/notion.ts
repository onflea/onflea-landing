// 노션 "NEWS 작성" DB 연동 (docs/news-feature-plan.md 참고)
const NEWS_DATABASE_ID = '3a2d652436f680e0b45bd4e75ec7fc51'
// 노션 수정 후 사이트 반영까지 최대 10분
const REVALIDATE_SECONDS = 600

const API_HEADERS = {
  Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
}

export interface NewsItem {
  id: string
  /** 상세 페이지 URL 조각 (대시 제거한 페이지 ID) */
  slug: string
  title: string
  /** ISO 날짜 (발행일, 없으면 생성일) */
  date: string
  category: string
  /** 노션 페이지 커버 이미지 (썸네일용, 없으면 null) */
  cover: string | null
}

export interface NotionRichText {
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    /** 노션 색상 — 'default' | 'red' | ... | 'red_background' 등 */
    color: string
  }
}

export interface NotionBlock {
  id: string
  type: string
  has_children: boolean
  children?: NotionBlock[]
  [key: string]: unknown
}

interface NotionPage {
  id: string
  created_time: string
  parent: { database_id?: string }
  cover: { type: string; file?: { url: string }; external?: { url: string } } | null
  properties: {
    '글 제목': { title: { plain_text: string }[] }
    카테고리: { select: { name: string } | null }
    발행일: { date: { start: string } | null }
    상태: { status: { name: string } | null }
    조회수?: { number: number | null }
  }
}

function toNewsItem(page: NotionPage): NewsItem {
  const cover = page.cover
    ? (page.cover.type === 'file' ? page.cover.file?.url : page.cover.external?.url) ?? null
    : null
  return {
    id: page.id,
    slug: page.id.replace(/-/g, ''),
    title: page.properties['글 제목'].title.map((t) => t.plain_text).join(''),
    date: page.properties['발행일'].date?.start ?? page.created_time.slice(0, 10),
    category: page.properties['카테고리'].select?.name ?? '공지',
    cover,
  }
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  if (!process.env.NOTION_TOKEN) return []

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${NEWS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({
        filter: { property: '상태', status: { equals: '발행 완료' } },
        sorts: [{ property: '발행일', direction: 'descending' }],
        page_size: 100,
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) throw new Error(`notion-query-failed: ${res.status}`)

    const data = (await res.json()) as { results: NotionPage[] }

    const items = data.results
      .map(toNewsItem)
      .filter((item) => item.title.length > 0)
      // 발행일 미입력 건이 섞여도 최신순 유지
      .sort((a, b) => b.date.localeCompare(a.date))

    return limit ? items.slice(0, limit) : items
  } catch {
    // 노션 장애 시 소식 영역만 조용히 숨김 (페이지 전체는 정상 렌더링)
    return []
  }
}

/** slug(대시 없는 페이지 ID)로 발행 완료 상태의 글 조회. 미발행/타 DB 글이면 null */
export async function getNewsPost(slug: string): Promise<NewsItem | null> {
  if (!process.env.NOTION_TOKEN || !/^[0-9a-f]{32}$/.test(slug)) return null

  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${slug}`, {
      headers: API_HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return null

    const page = (await res.json()) as NotionPage
    if (page.parent.database_id?.replace(/-/g, '') !== NEWS_DATABASE_ID) return null
    if (page.properties['상태'].status?.name !== '발행 완료') return null

    return toNewsItem(page)
  } catch {
    return null
  }
}

/** 페이지 본문 블록 조회 (리스트 중첩 1단계까지) */
export async function getNewsBlocks(slug: string): Promise<NotionBlock[]> {
  if (!process.env.NOTION_TOKEN) return []

  async function fetchChildren(blockId: string): Promise<NotionBlock[]> {
    const blocks: NotionBlock[] = []
    let cursor: string | undefined

    do {
      const params = new URLSearchParams({ page_size: '100' })
      if (cursor) params.set('start_cursor', cursor)
      const res = await fetch(
        `https://api.notion.com/v1/blocks/${blockId}/children?${params}`,
        { headers: API_HEADERS, next: { revalidate: REVALIDATE_SECONDS } },
      )
      if (!res.ok) throw new Error(`notion-blocks-failed: ${res.status}`)
      const data = (await res.json()) as {
        results: NotionBlock[]
        has_more: boolean
        next_cursor: string | null
      }
      blocks.push(...data.results)
      cursor = data.has_more ? data.next_cursor ?? undefined : undefined
    } while (cursor)

    return blocks
  }

  try {
    const blocks = await fetchChildren(slug)
    // 리스트 항목 하위(들여쓰기) 블록과 표의 행 블록만 1단계 추가 조회
    await Promise.all(
      blocks
        .filter((b) => b.has_children && ['bulleted_list_item', 'numbered_list_item', 'table'].includes(b.type))
        .map(async (b) => {
          b.children = await fetchChildren(b.id)
        }),
    )
    return blocks
  } catch {
    return []
  }
}

export function formatNewsDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${y}.${m}.${d}`
}

/** 조회수 +1 — 노션 내부 기록용 (사이트에는 노출하지 않음). 발행 완료 글만 집계 */
export async function incrementNewsViews(slug: string): Promise<void> {
  if (!process.env.NOTION_TOKEN || !/^[0-9a-f]{32}$/.test(slug)) return

  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${slug}`, {
      headers: API_HEADERS,
      cache: 'no-store',
    })
    if (!res.ok) return

    const page = (await res.json()) as NotionPage
    if (page.parent.database_id?.replace(/-/g, '') !== NEWS_DATABASE_ID) return
    if (page.properties['상태'].status?.name !== '발행 완료') return

    const current = page.properties['조회수']?.number ?? 0
    await fetch(`https://api.notion.com/v1/pages/${slug}`, {
      method: 'PATCH',
      headers: API_HEADERS,
      body: JSON.stringify({ properties: { 조회수: { number: current + 1 } } }),
      cache: 'no-store',
    })
  } catch {
    // 집계 실패는 무시 (페이지 열람에 영향 없음)
  }
}
