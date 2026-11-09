import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'
import NewsList from '@/components/NewsList'
import { getNews } from '@/lib/notion'

export const revalidate = 600

export const metadata = {
  title: '소식 | ONFLEA(온플리)',
  description: 'ONFLEA(온플리)의 기부 소식, 크리에이터 입점 소식, 서비스 업데이트를 전합니다.',
  alternates: {
    canonical: '/news',
  },
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <>
      <LegalHeader />
      <main className="bg-white min-h-screen">
        {/* 다크 헤더 밴드 */}
        <div className="bg-[#0c0c0c]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(255,255,255,0.4)] mb-5">
              News
            </p>
            <h1 className="text-4xl md:text-[64px] font-black leading-[1.15] text-white mb-5">
              ONFLEA의 소식
            </h1>
            <p className="text-base text-[rgba(255,255,255,0.5)] leading-relaxed max-w-[480px]">
              기부 소식, 크리에이터 입점 소식, 서비스 업데이트를 전합니다.
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-14 md:py-20">
          {news.length > 0 ? (
            <NewsList items={news} />
          ) : (
            <div className="border-t border-b border-[rgba(12,12,12,0.08)] py-20 text-center">
              <p className="text-[rgba(12,12,12,0.45)] text-sm">
                아직 등록된 소식이 없습니다. 곧 첫 소식으로 찾아뵐게요.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
