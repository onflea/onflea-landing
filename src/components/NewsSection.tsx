import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getNews, formatNewsDate } from '@/lib/notion'

export default async function NewsSection() {
  const news = await getNews(3)
  if (news.length === 0) return null

  return (
    <section id="news" className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">
              News
            </p>
            <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c]">
              ONFLEA의 새로운 소식
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[2.16px] uppercase text-[#0c0c0c] border border-[rgba(12,12,12,0.3)] px-6 py-3.5 self-start hover:bg-[#0c0c0c] hover:text-white transition-colors"
          >
            전체 소식 보기
            <span className="text-sm">→</span>
          </Link>
        </div>

        <div data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
          {news.map((item, i) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 md:gap-8 py-6 border-b border-[rgba(12,12,12,0.08)] ${
                i === 0 ? 'border-t' : ''
              }`}
            >
              <span className="text-sm text-[rgba(12,12,12,0.4)] tabular-nums shrink-0 w-[88px]">
                {formatNewsDate(item.date)}
              </span>
              <span className="hidden sm:inline-flex border border-[rgba(12,12,12,0.18)] px-3 py-1.5 text-[10px] font-bold tracking-[1.5px] text-[rgba(12,12,12,0.55)] shrink-0">
                {item.category}
              </span>
              <span className="flex-1 text-base md:text-lg font-bold text-[#0c0c0c] truncate group-hover:underline underline-offset-4">
                {item.title}
              </span>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-[rgba(12,12,12,0.3)] group-hover:text-[#0c0c0c] transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
