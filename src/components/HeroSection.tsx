'use client'

import { useModal } from '@/context/ModalContext'

export default function HeroSection() {
  const { openCreator, openBuyer } = useModal()

  return (
    <section id="hero" className="bg-[#0c0c0c] min-h-screen flex flex-col">
      <div className="flex-1 max-w-[1280px] mx-auto px-6 md:px-12 pt-28 pb-16 w-full flex flex-col justify-center">
        <div className="max-w-[896px]">
          <div className="inline-flex items-center gap-2.5 border border-[rgba(255,77,109,0.4)] px-[15px] py-[9px] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d6d] opacity-70 shrink-0" />
            <p className="text-[#ff4d6d] text-[10px] tracking-[2.5px] uppercase font-normal">
              Online Recommerce Platform
            </p>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-[88px] font-black leading-[1.08] tracking-[-0.025em] mb-8">
            크리에이터의<br />
            <span className="text-[#ff4d6d]">옷장 속 아이템</span>을,<br />
            팬의 일상으로.
          </h1>

          <p className="text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed mb-12">
            패션 크리에이터의 의류를 수거부터 판매, 배송, 정산까지 대행하는 온라인 리커머스 플랫폼. <br></br>오프라인 플리마켓의 번거로움을 줄이고, 크리에이터의 옷을 더 쉽고 안전하게 만날 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openCreator}
              className="bg-[#ff4d6d] text-[#0c0c0c] text-[12px] font-bold tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center justify-center gap-2 hover:bg-[#e8365a] transition-colors"
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

      <div className="flex justify-center pb-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[rgba(255,255,255,0.2)] text-[10px] tracking-[3px] uppercase">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
