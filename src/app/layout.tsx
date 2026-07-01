import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ON-FLEA | 크리에이터의 옷장 속 아이템을, 팬의 일상으로',
  description:
    'ON-FLEA는 패션 크리에이터의 협찬·리뷰·촬영 의류를 수거해 촬영, 검수, 판매, 배송, CS, 정산까지 대행하는 온라인 리커머스 풀필먼트 플랫폼입니다.',
  keywords: [
    '패션 크리에이터',
    '온라인 플리마켓',
    '리커머스',
    '의류 위탁 판매',
    'ON-FLEA',
    '중고 의류',
    '크리에이터 협찬',
  ],
  authors: [{ name: 'ON-FLEA' }],
  openGraph: {
    title: 'ON-FLEA | 크리에이터의 옷장 속 아이템을, 팬의 일상으로',
    description:
      'ON-FLEA는 패션 크리에이터의 협찬·리뷰·촬영 의류를 수거해 촬영, 검수, 판매, 배송, CS, 정산까지 대행하는 온라인 리커머스 풀필먼트 플랫폼입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ON-FLEA | 크리에이터의 옷장 속 아이템을, 팬의 일상으로',
    description:
      'ON-FLEA는 패션 크리에이터의 협찬·리뷰·촬영 의류를 수거해 촬영, 검수, 판매, 배송, CS, 정산까지 대행하는 온라인 리커머스 풀필먼트 플랫폼입니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
