'use client'

import { useState } from 'react'
import NewsRow from '@/components/NewsRow'
import type { NewsItem } from '@/lib/notion'

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map((item) => item.category)))
  const filtered = category ? items.filter((item) => item.category === category) : items

  return (
    <div>
      {/* 카테고리 필터 */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? '전체'}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 text-[12px] font-bold tracking-[1.5px] border transition-colors ${
                category === c
                  ? 'bg-[#0c0c0c] text-white border-[#0c0c0c]'
                  : 'border-[rgba(12,12,12,0.18)] text-[rgba(12,12,12,0.7)] hover:text-[#0c0c0c] hover:border-[rgba(12,12,12,0.4)]'
              }`}
            >
              {c ?? '전체'}
              {c === null && (
                <span className="ml-2 text-[11px] opacity-50 tabular-nums">{items.length}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        filtered.map((item, i) => <NewsRow key={item.id} item={item} first={i === 0} />)
      ) : (
        <div className="border-t border-b border-[rgba(12,12,12,0.08)] py-20 text-center">
          <p className="text-[rgba(12,12,12,0.6)] text-base">해당 카테고리의 소식이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
