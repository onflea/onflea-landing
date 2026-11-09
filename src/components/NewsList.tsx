'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { NewsItem } from '@/lib/notion'

function NewsGridItem({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="group flex items-start gap-4 md:gap-6 py-5 md:py-6">
      {/* 썸네일 — 노션 페이지 커버, 없으면 로고 카드 (커버는 로딩 중 밝은 배경) */}
      <div
        className={`w-[38%] md:w-[48%] shrink-0 aspect-[3/2] rounded-xl overflow-hidden flex items-center justify-center ${
          item.cover ? 'bg-[#f2f2f2]' : 'bg-[#0c0c0c]'
        }`}
      >
        {item.cover ? (
          // 노션 커버 URL은 만료 기한이 있어 next/image 대신 원본 사용
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <Image
            src="/images/logo-text-white.png"
            alt=""
            width={807}
            height={128}
            sizes="160px"
            className="w-[58%] h-auto"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 md:pt-2">
        <h2 className="text-[16px] md:text-[19px] font-medium leading-[1.45] text-[#0c0c0c] break-keep line-clamp-3 underline-offset-4 group-hover:underline">
          {item.title}
        </h2>
        <p className="mt-2 md:mt-3 text-[13px] md:text-[14px] text-[rgba(12,12,12,0.6)] tabular-nums">
          {item.category}
          <span aria-hidden className="mx-1.5 text-[rgba(12,12,12,0.3)]">·</span>
          {item.date.split('-').join('.')}
        </p>
      </div>
    </Link>
  )
}

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const categories = Array.from(new Set(items.map((item) => item.category)))
  const keyword = query.trim().toLowerCase()
  const filtered = items.filter(
    (item) =>
      (!category || item.category === category) && item.title.toLowerCase().includes(keyword),
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
        <p aria-live="polite" className="text-[18px] md:text-[22px] font-medium text-[rgba(12,12,12,0.55)]">
          <span className="text-[#0c0c0c] tabular-nums">{filtered.length}</span>건의 소식이 있습니다.
        </p>

        <div className="relative w-full md:w-[400px]">
          {/* 모바일 입력 시 iOS 자동 확대를 막기 위해 16px 유지 */}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="소식 검색"
            aria-label="소식 검색"
            className="w-full h-12 pl-5 pr-12 rounded-full bg-[#f2f2f2] text-base text-[#0c0c0c] placeholder:text-[rgba(12,12,12,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-[#0c0c0c]"
          />
          <Search
            aria-hidden
            size={20}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0c0c0c] pointer-events-none"
          />
        </div>
      </div>

      {/* 카테고리 필터 — 카테고리가 2개 이상일 때만 표시 */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? '전체'}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`px-4 py-2 rounded-full text-[14px] font-medium border transition-colors ${
                category === c
                  ? 'bg-[#0c0c0c] text-white border-[#0c0c0c]'
                  : 'border-[rgba(12,12,12,0.18)] text-[rgba(12,12,12,0.7)] hover:text-[#0c0c0c] hover:border-[rgba(12,12,12,0.4)]'
              }`}
            >
              {c ?? '전체'}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <ul className="grid md:grid-cols-2 gap-x-6">
          {filtered.map((item) => (
            <li key={item.id} className="border-t border-[rgba(12,12,12,0.1)]">
              <NewsGridItem item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-t border-[rgba(12,12,12,0.1)] py-20 text-center">
          <p className="text-[rgba(12,12,12,0.6)] text-base">찾으시는 소식이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
