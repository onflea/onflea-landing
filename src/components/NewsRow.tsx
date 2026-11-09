import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { NewsItem } from '@/lib/notion'

/* 소식 목록 공용 행 — 메인 NEWS 섹션, /news 목록, 상세 하단 '다른 소식'에서 사용 */
export default function NewsRow({ item, first = false }: { item: NewsItem; first?: boolean }) {
  const date = item.date.split('-').join('.')

  return (
    <Link
      href={`/news/${item.slug}`}
      className={`group flex flex-col md:flex-row md:items-center gap-2.5 md:gap-8 py-6 md:py-7 border-b border-[rgba(12,12,12,0.08)] ${
        first ? 'border-t' : ''
      }`}
    >
      {/* 메타 (날짜 + 카테고리) — 고정 폭으로 제목 시작점 정렬 */}
      <span className="flex items-center gap-3 shrink-0 md:w-[250px]">
        <span className="text-[14px] text-[rgba(12,12,12,0.6)] tabular-nums w-[84px] shrink-0">
          {date}
        </span>
        <span className="border border-[rgba(12,12,12,0.18)] px-2.5 py-1 text-[12px] font-bold tracking-[1.5px] text-[rgba(12,12,12,0.7)] whitespace-nowrap">
          {item.category}
        </span>
      </span>

      <span className="flex-1 min-w-0 flex items-center justify-between gap-4">
        <span className="text-base md:text-lg font-bold text-[#0c0c0c] truncate transition-colors group-hover:underline underline-offset-4 decoration-2">
          {item.title}
        </span>
        <ArrowRight
          size={18}
          className="shrink-0 text-[rgba(12,12,12,0.25)] transition-all duration-200 group-hover:text-[#0c0c0c] group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
