import { MetadataRoute } from 'next'
import { getNews } from '@/lib/notion'
import { SITE_URL } from '@/lib/seo'

// 고정 페이지는 내용이 실제로 바뀐 배포일로 갱신해주세요
const HOME_UPDATED = '2026-11-09'
const NEWS_LIST_UPDATED = '2026-11-09'
const LEGAL_UPDATED = '2026-07-10'

/** ISO 날짜 중 가장 최근 (비어 있는 값은 무시) */
function latest(base: string, other: string | undefined): Date {
  return new Date(other && other > base ? other : base)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 발행 완료 글만 (웹훅으로 글 목록과 함께 갱신됨)
  const news = await getNews()
  const latestPost = news[0]?.date

  return [
    {
      url: SITE_URL,
      // 홈에 최신 소식이 보이므로 새 글이 올라오면 홈도 바뀐 것으로 본다
      lastModified: latest(HOME_UPDATED, latestPost),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: latest(NEWS_LIST_UPDATED, latestPost),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // 글 수정일은 쓰지 않는다: 조회수 기록도 노션 수정일을 바꿔서 매번 바뀐 것처럼 보이게 됨
    ...news.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(LEGAL_UPDATED),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(LEGAL_UPDATED),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
