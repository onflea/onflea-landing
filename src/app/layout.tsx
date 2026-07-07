import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const siteUrl = 'https://onflea.kr'
const siteTitle = 'ONFLEA(온플리) | 크리에이터의 옷장 속 아이템을, 팬의 일상으로'
const siteDescription =
  'ONFLEA(온플리)는 패션 크리에이터의 협찬·리뷰·촬영 의류를 수거해 촬영, 검수, 판매, 배송, CS, 정산까지 대행하는 온라인 플리마켓 플랫폼입니다.'
const ogImage = '/og.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    '온플리',
    '온플리 ONFLEA',
    '온플리 플리마켓',
    '온플리 크리에이터',
    'ONFLEA',
    '패션 크리에이터',
    '온라인 플리마켓',
    '리커머스',
    '의류 위탁 판매',
    '중고 의류',
    '크리에이터 협찬',
  ],
  authors: [{ name: 'ONFLEA' }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'ONFLEA(온플리)',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'ONFLEA(온플리)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'ONFLEA',
      alternateName: ['온플리', 'ONFLEA(온플리)'],
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description: siteDescription,
      email: 'contact@onflea.kr',
      sameAs: ['https://www.instagram.com/onflea.official/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      name: 'ONFLEA(온플리)',
      alternateName: '온플리',
      url: siteUrl,
      inLanguage: 'ko-KR',
      description: siteDescription,
      publisher: { '@id': `${siteUrl}#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
