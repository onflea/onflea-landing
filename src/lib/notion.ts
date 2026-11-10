// 노션 "NEWS 작성" DB 연동 (docs/news-feature-plan.md 참고)
const NEWS_DATABASE_ID = '3a2d652436f680e0b45bd4e75ec7fc51'
// 발행·수정은 웹훅(api/notion/webhook)이 NEWS_CACHE_TAG로 바로 반영한다.
// 주기 갱신은 웹훅이 누락될 때를 대비해 유지
const REVALIDATE_SECONDS = 600
export const NEWS_CACHE_TAG = 'news'
const NEWS_FETCH_CACHE = { revalidate: REVALIDATE_SECONDS, tags: [NEWS_CACHE_TAG] }

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

interface NotionFile {
  type: string
  /** 노션 업로드 파일: 임시 주소와 그 만료 시각 */
  file?: { url: string; expiry_time?: string }
  external?: { url: string }
}

interface NotionPage {
  id: string
  created_time: string
  parent: { database_id?: string }
  cover: NotionFile | null
  properties: {
    '글 제목': { title: { plain_text: string }[] }
    카테고리: { select: { name: string } | null }
    발행일: { date: { start: string } | null }
    상태: { status: { name: string } | null }
    조회수?: { number: number | null }
  }
}

/*
 * 노션에 올린 파일의 주소는 1시간 뒤 만료되는 임시 주소(S3 서명 URL)다.
 * 페이지에 그대로 넣으면 오래 캐시된 페이지·카톡 미리보기에서 이미지가 깨지므로
 * 만료 없는 사이트 주소(/api/news/image/...)로 바꿔 넣고, 그 경로가 요청 시점에 새 주소로 이미지를 내려준다.
 */
export type NewsImageKind = 'cover' | 'block'

/** 노션 파일 주소에서 업로드 파일 ID (파일을 바꾸면 달라짐). 이미지 주소의 캐시 버전으로 쓴다 */
export function notionFileKey(url: string): string {
  try {
    return new URL(url).pathname.split('/')[2] ?? ''
  } catch {
    return ''
  }
}

/** 페이지에 넣을 이미지 주소. 외부 링크 이미지는 만료가 없으므로 그대로 */
function newsImageUrl(kind: NewsImageKind, id: string, image: NotionFile | null | undefined): string | null {
  if (!image) return null
  if (image.type === 'external') return image.external?.url ?? null
  const url = image.file?.url
  if (!url) return null
  return `/api/news/image/${kind}/${id.replace(/-/g, '')}?v=${notionFileKey(url)}`
}

function isPublishedNewsPage(page: NotionPage): boolean {
  return (
    page.parent.database_id?.replace(/-/g, '') === NEWS_DATABASE_ID &&
    page.properties['상태'].status?.name === '발행 완료'
  )
}

function toNewsItem(page: NotionPage): NewsItem {
  return {
    id: page.id,
    slug: page.id.replace(/-/g, ''),
    title: page.properties['글 제목'].title.map((t) => t.plain_text).join(''),
    date: page.properties['발행일'].date?.start ?? page.created_time.slice(0, 10),
    category: page.properties['카테고리'].select?.name ?? '공지',
    cover: newsImageUrl('cover', page.id, page.cover),
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
      next: NEWS_FETCH_CACHE,
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
      next: NEWS_FETCH_CACHE,
    })
    if (!res.ok) return null

    const page = (await res.json()) as NotionPage
    if (!isPublishedNewsPage(page)) return null

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
        { headers: API_HEADERS, next: NEWS_FETCH_CACHE },
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
    replaceImageUrls(blocks)
    return blocks
  } catch {
    return []
  }
}

/** 본문 이미지 블록의 노션 임시 주소를 만료 없는 사이트 주소로 교체 */
function replaceImageUrls(blocks: NotionBlock[]) {
  for (const block of blocks) {
    if (block.type === 'image') {
      const image = block.image as NotionFile
      const url = newsImageUrl('block', block.id, image)
      if (image.type === 'file' && image.file && url) image.file.url = url
    }
    if (block.children) replaceImageUrls(block.children)
  }
}

/** 남은 유효시간이 이보다 짧은 노션 주소는 새로 받는다 (이미지 경로가 리다이렉트를 5분 캐시하므로 그보다 길게) */
const IMAGE_URL_MIN_LIFETIME_MS = 10 * 60 * 1000

/** 노션 업로드 파일 주소가 곧 만료되는지 (노션이 함께 주는 expiry_time 기준). 외부 링크는 만료 없음 */
function isExpiringSoon(image: NotionFile): boolean {
  const expiresAt = image.type === 'file' ? Date.parse(image.file?.expiry_time ?? '') : NaN
  return !Number.isNaN(expiresAt) && expiresAt - Date.now() < IMAGE_URL_MIN_LIFETIME_MS
}

/**
 * 이미지 경로(/api/news/image)가 내려줄 노션 원본 주소.
 * 커버는 발행 완료된 소식 글만, 블록은 이미지 블록만 허용한다.
 * 캐시된 노션 응답의 주소가 곧 만료되면 캐시를 건너뛰고 새로 받는다.
 */
export async function getNewsImageSource(kind: NewsImageKind, id: string): Promise<string | null> {
  if (!process.env.NOTION_TOKEN || !/^[0-9a-f]{32}$/.test(id)) return null

  const endpoint = kind === 'cover' ? `pages/${id}` : `blocks/${id}`

  for (const fresh of [false, true]) {
    let res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
      headers: API_HEADERS,
      ...(fresh ? { cache: 'no-store' as const } : { next: NEWS_FETCH_CACHE }),
    })
    // 노션 요청 한도(연결당 1분 180회, 몰아 쓰기 가능)에 걸리면 한 번만 잠시 후 재시도
    if (res.status === 429) {
      const waitMs = Math.min(Number(res.headers.get('Retry-After')) || 1, 2) * 1000
      await new Promise((resolve) => setTimeout(resolve, waitMs))
      res = await fetch(`https://api.notion.com/v1/${endpoint}`, { headers: API_HEADERS, cache: 'no-store' })
    }
    if (!res.ok) return null

    let image: NotionFile | null | undefined
    if (kind === 'cover') {
      const page = (await res.json()) as NotionPage
      if (!isPublishedNewsPage(page)) return null
      image = page.cover
    } else {
      const block = (await res.json()) as NotionBlock
      if (block.type !== 'image') return null
      image = block.image as NotionFile
    }

    if (!image) return null
    const src = image.type === 'file' ? image.file?.url : image.external?.url
    if (!src) return null
    if (!isExpiringSoon(image)) return src
  }
  return null
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
    if (!isPublishedNewsPage(page)) return

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
