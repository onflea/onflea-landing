import Link from 'next/link'
import NewsCarousel from '@/components/NewsCarousel'
import { getNews } from '@/lib/notion'

export default async function NewsSection() {
  const news = await getNews(8)
  if (news.length === 0) return null

  return (
    <section id="news" className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-[44px] font-black leading-[1.3]">
            <span className="block text-[rgba(12,12,12,0.3)]">ONFLEA의</span>
            <span className="block text-[#0c0c0c]">새로운 소식을 만나보세요.</span>
          </h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-[#0c0c0c] text-white text-[12px] font-bold tracking-[2.16px] uppercase px-6 py-3.5 self-start sm:self-auto hover:bg-[#333] transition-colors shrink-0"
          >
            전체 소식
            <span className="text-sm">→</span>
          </Link>
        </div>

        <div data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
          <NewsCarousel items={news} />
        </div>
      </div>
    </section>
  )
}
