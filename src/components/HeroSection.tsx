'use client'

import { preload } from 'react-dom'
import { useModal } from '@/context/ModalContext'

export default function HeroSection() {
  const { openCreator, openBuyer } = useModal()
  // CSS background-image는 preload되지 않으므로 명시적으로 미리 로드 (LCP 개선)
  preload('/images/hero-bg.jpg', { as: 'image' })

  return (
    <section id="hero" className="sticky top-0 z-0 bg-[#0c0c0c] min-h-screen flex flex-col overflow-hidden">
      {/* 배경 이미지 (모바일: 오른쪽 아래 제품 / 데스크톱: 가운데 아래) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-right-bottom md:bg-bottom animate-fade-in"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* 오버레이 — 데스크톱 (왼쪽 어둡게 → 오른쪽 제품 노출) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.85) 40%, rgba(12,12,12,0.55) 75%, rgba(12,12,12,0.4) 100%), linear-gradient(180deg, rgba(12,12,12,0.6) 0%, rgba(12,12,12,0.15) 35%, transparent 70%, rgba(12,12,12,0.25) 100%)',
        }}
      />
      {/* 오버레이 — 모바일 (세로 방향, 전체적으로 진하게) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,12,0.88) 0%, rgba(12,12,12,0.72) 40%, rgba(12,12,12,0.62) 65%, rgba(12,12,12,0.8) 100%)',
        }}
      />

      <div className="relative flex-1 max-w-[1280px] mx-auto px-6 md:px-12 pt-28 pb-16 w-full flex flex-col justify-center">
        <div className="max-w-[896px]">
          <div
            className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.25)] px-[15px] py-[9px] mb-6 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 shrink-0" />
            <p className="text-white/70 text-[10px] tracking-[2.5px] uppercase font-normal">
              Online Flea Market Platform
            </p>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-[88px] font-black leading-[1.08] tracking-[-0.025em] mb-8">
            <span className="block animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              크리에이터의
            </span>
            <span className="block animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              옷장 속 아이템을,
            </span>
            <span className="block animate-fade-in-up" style={{ animationDelay: '550ms' }}>
              팬의 일상으로.
            </span>
          </h1>

          <p
            className="text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed mb-12 animate-fade-in-up"
            style={{ animationDelay: '750ms' }}
          >
            옷만 맡기면 수거부터 촬영, 판매, 배송, 정산까지 — ONFLEA가 모두 대신합니다.<br />
            크리에이터는 콘텐츠에, 팬은 쇼핑에만 집중하세요.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: '950ms' }}
          >
            <button
              onClick={openCreator}
              className="bg-white text-[#0c0c0c] text-[12px] font-bold tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center justify-center gap-2 hover:bg-[#f5f5f5] transition-colors"
            >
              입점 문의하기
              <span className="text-sm">→</span>
            </button>
            <button
              onClick={openBuyer}
              className="border border-[rgba(255,255,255,0.4)] text-white text-[12px] font-medium tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center justify-center gap-2 hover:border-white transition-colors"
            >
              오픈 알림 받기
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative flex justify-center pb-10 animate-fade-in-up"
        style={{ animationDelay: '1200ms' }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-[rgba(255,255,255,0.2)] text-[10px] tracking-[3px] uppercase">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
