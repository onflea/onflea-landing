import { MetadataRoute } from 'next'

const baseUrl = 'https://corp.onflea.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  // 콘텐츠가 실제로 바뀐 배포일에 갱신해주세요
  const lastModified = new Date('2026-07-09')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
