// 노션 "NEWS 작성" DB 연동 (docs/news-feature-plan.md 참고)
const NEWS_DATABASE_ID = '3a2d652436f680e0b45bd4e75ec7fc51'
// 노션 수정 후 사이트 반영까지 최대 10분
const REVALIDATE_SECONDS = 600

export interface NewsItem {
  id: string
  title: string
  /** ISO 날짜 (발행일, 없으면 생성일) */
  date: string
  category: string
  /** 노션 공개 페이지 URL */
  url: string
}

interface NotionPage {
  id: string
  created_time: string
  url: string
  public_url: string | null
  properties: {
    '글 제목': { title: { plain_text: string }[] }
    카테고리: { select: { name: string } | null }
    발행일: { date: { start: string } | null }
  }
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  if (!process.env.NOTION_TOKEN) return []

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${NEWS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
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
      .map((page) => ({
        id: page.id,
        title: page.properties['글 제목'].title.map((t) => t.plain_text).join(''),
        date: page.properties['발행일'].date?.start ?? page.created_time.slice(0, 10),
        category: page.properties['카테고리'].select?.name ?? '공지',
        url: page.public_url ?? page.url,
      }))
      .filter((item) => item.title.length > 0)
      // 발행일 미입력 건이 섞여도 최신순 유지
      .sort((a, b) => b.date.localeCompare(a.date))

    return limit ? items.slice(0, limit) : items
  } catch {
    // 노션 장애 시 소식 영역만 조용히 숨김 (페이지 전체는 정상 렌더링)
    return []
  }
}

export function formatNewsDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${y}.${m}.${d}`
}
