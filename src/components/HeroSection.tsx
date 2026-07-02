'use client'

import { useModal } from '@/context/ModalContext'

export default function HeroSection() {
  const { openCreator, openBuyer } = useModal()

  return (
    <section id="hero" className="relative bg-[#0c0c0c] min-h-screen flex flex-col overflow-hidden">
      {/* 그라데이션 오버레이 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 85% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 45%, transparent 75%), radial-gradient(50% 50% at 15% 90%, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative flex-1 max-w-[1280px] mx-auto px-6 md:px-12 pt-28 pb-16 w-full flex flex-col justify-center">
        <div className="max-w-[896px]">
          <div className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,0.25)] px-[15px] py-[9px] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 shrink-0" />
            <p className="text-white/70 text-[10px] tracking-[2.5px] uppercase font-normal">
              Online Flea Market Platform
            </p>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-[88px] font-black leading-[1.08] tracking-[-0.025em] mb-8">
            크리에이터의<br />
            옷장 속 아이템을,<br />
            팬의 일상으로.
          </h1>

          <p className="text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed mb-12">
            옷만 맡기면 수거부터 촬영, 판매, 배송, 정산까지 — ON-FLEA가 모두 대신합니다.<br />
            크리에이터는 콘텐츠에, 팬은 쇼핑에만 집중하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
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

      <div className="relative flex justify-center pb-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[rgba(255,255,255,0.2)] text-[10px] tracking-[3px] uppercase">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
