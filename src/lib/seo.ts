import type { Metadata } from 'next'

export const SITE_URL = 'https://corp.onflea.kr'
export const SITE_NAME = 'ONFLEA(온플리)'
export const DEFAULT_OG_IMAGE = {
  url: '/og-logo.jpg',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
}

interface PageMetadataInput {
  /** <title> */
  title: string
  description: string
  /** 대표 주소 겸 og:url (예: '/news') */
  path: string
  /** 공유 미리보기 제목·설명 (기본: title·description) */
  shareTitle?: string
  shareDescription?: string
  /** 공유 이미지 (기본: 로고) */
  image?: { url: string; alt: string }
  /** 있으면 og:type을 article로 */
  article?: { publishedTime: string; section: string; authors: string[] }
}

/**
 * 하위 페이지 메타데이터.
 * openGraph·twitter는 레이아웃 값과 합쳐지지 않고 통째로 교체되므로
 * 하위 페이지에서 쓸 때는 이 함수로 공통 항목(사이트 이름·주소·이미지)까지 전부 채운다.
 */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const shareTitle = input.shareTitle ?? input.title
  const shareDescription = input.shareDescription ?? input.description
  const image = input.image ?? DEFAULT_OG_IMAGE
  const common = {
    title: shareTitle,
    description: shareDescription,
    url: input.path,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    images: [image],
  }

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: input.article
      ? { ...common, type: 'article', ...input.article }
      : { ...common, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [image.url],
    },
  }
}
