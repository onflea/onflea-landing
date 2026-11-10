import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'
import NewsList from '@/components/NewsList'
import { getNews } from '@/lib/notion'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 600

export const metadata = pageMetadata({
  title: '소식 | ONFLEA(온플리)',
  description: 'ONFLEA(온플리)의 기부 소식, 크리에이터 입점 소식, 서비스 업데이트를 전합니다.',
  path: '/news',
})

export default async function NewsPage() {
  const news = await getNews()

  return (
    <>
      <LegalHeader />
      <main className="bg-white min-h-screen">
        <h1 className="pt-20 md:pt-28 pb-14 md:pb-24 text-center text-4xl md:text-[48px] font-black text-[#0c0c0c]">
          소식
        </h1>

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
          {news.length > 0 ? (
            <NewsList items={news} />
          ) : (
            <div className="border-t border-[rgba(12,12,12,0.1)] py-20 text-center">
              <p className="text-[rgba(12,12,12,0.6)] text-base">
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
