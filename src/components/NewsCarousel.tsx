'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { NewsItem } from '@/lib/notion'

function NewsCard({ item }: { item: NewsItem }) {
  const date = item.date.split('-').join('.')

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group w-[260px] sm:w-[300px] md:w-[320px] shrink-0 snap-start"
    >
      {/* 썸네일 — 노션 페이지 커버, 없으면 심볼 플레이스홀더 */}
      <div className="aspect-[4/3] bg-[rgba(255,255,255,0.06)] overflow-hidden mb-4">
        {item.cover ? (
          // 노션 커버 URL은 만료 기한이 있어 next/image 대신 원본 사용
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.cover}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/images/logo-symbol-white.png"
              alt=""
              width={200}
              height={200}
              className="w-12 h-auto opacity-[0.15] transition-opacity duration-300 group-hover:opacity-30"
            />
          </div>
        )}
      </div>

      <p className="text-[11px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] mb-2">
        {item.category} <span className="mx-1 text-[rgba(255,255,255,0.2)]">·</span> {date}
      </p>
      <h3 className="text-base md:text-[17px] font-bold text-white leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-2">
        {item.title}
      </h3>
    </Link>
  )
}

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows])

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : 340
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* 이전/다음 */}
      <div className="flex gap-2 mt-10">
        <button
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          aria-label="이전 소식"
          className="size-11 border border-[rgba(255,255,255,0.3)] flex items-center justify-center text-white transition-colors hover:bg-white hover:text-[#0c0c0c] disabled:opacity-25 disabled:pointer-events-none"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          onClick={() => scroll(1)}
          disabled={!canNext}
          aria-label="다음 소식"
          className="size-11 border border-[rgba(255,255,255,0.3)] flex items-center justify-center text-white transition-colors hover:bg-white hover:text-[#0c0c0c] disabled:opacity-25 disabled:pointer-events-none"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
