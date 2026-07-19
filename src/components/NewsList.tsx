'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { NewsItem } from '@/lib/notion'

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map((item) => item.category)))
  const filtered = category ? items.filter((item) => item.category === category) : items

  const formatDate = (iso: string) => iso.split('-').join('.')

  return (
    <div>
      {/* 카테고리 필터 */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? '전체'}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 text-[12px] font-bold tracking-[1.5px] border transition-colors ${
                category === c
                  ? 'bg-[#0c0c0c] text-white border-[#0c0c0c]'
                  : 'border-[rgba(12,12,12,0.18)] text-[rgba(12,12,12,0.55)] hover:text-[#0c0c0c] hover:border-[rgba(12,12,12,0.4)]'
              }`}
            >
              {c ?? '전체'}
            </button>
          ))}
        </div>
      )}

      {filtered.map((item, i) => (
        <Link
          key={item.id}
          href={`/news/${item.slug}`}
          className={`group flex items-center gap-4 md:gap-8 py-6 border-b border-[rgba(12,12,12,0.08)] ${
            i === 0 ? 'border-t' : ''
          }`}
        >
          <span className="text-sm text-[rgba(12,12,12,0.4)] tabular-nums shrink-0 w-[88px]">
            {formatDate(item.date)}
          </span>
          <span className="hidden sm:inline-flex border border-[rgba(12,12,12,0.18)] px-3 py-1.5 text-[10px] font-bold tracking-[1.5px] text-[rgba(12,12,12,0.55)] shrink-0">
            {item.category}
          </span>
          <span className="flex-1 text-base md:text-lg font-bold text-[#0c0c0c] truncate group-hover:underline underline-offset-4">
            {item.title}
          </span>
          <ArrowRight
            size={18}
            className="shrink-0 text-[rgba(12,12,12,0.3)] group-hover:text-[#0c0c0c] transition-colors"
          />
        </Link>
      ))}
    </div>
  )
}
