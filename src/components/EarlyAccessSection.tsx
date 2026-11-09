'use client'

import { useModal } from '@/context/ModalContext'
import { SHOP_URL } from '@/lib/constants'

export default function EarlyAccessSection() {
  const { openCreator } = useModal()

  return (
    <section id="early-access" className="bg-[#f5f5f5] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div data-reveal className="flex flex-col items-center mb-16">
          <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5 text-center">
            Get Started
          </p>
          <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c] text-center">
            크리에이터의 플리마켓, <br className="hidden md:block" />지금 ONFLEA에서.
          </h2>
        </div>

        <div data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties} className="grid md:grid-cols-2 gap-px bg-[rgba(12,12,12,0.08)]">
          {/* 크리에이터 — 다크 */}
          <div className="bg-[#0c0c0c] p-12 md:p-14 flex flex-col">
            <p className="text-[rgba(255,255,255,0.5)] text-[10px] font-bold tracking-[2.5px] uppercase mb-4">크리에이터</p>
            <h3 className="text-white text-3xl font-black mb-4">입점 문의하기</h3>
            <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed max-w-[480px] mb-8">
              패션 콘텐츠를 만들고 있고, 협찬·리뷰·촬영 의류가 쌓이고 있다면 ONFLEA가 판매 과정을 대신 도와드립니다.
            </p>
            <div className="mt-auto">
              <button
                onClick={openCreator}
                className="bg-white text-[#0c0c0c] text-[12px] font-bold tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-[#f5f5f5] transition-colors"
              >
                입점 문의하기
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* 구매자 — 라이트 */}
          <div className="bg-white p-12 md:p-14 flex flex-col">
            <p className="text-[rgba(12,12,12,0.35)] text-[10px] font-bold tracking-[2.5px] uppercase mb-4">구매자</p>
            <h3 className="text-[#0c0c0c] text-3xl font-black mb-4">지금 쇼핑하기</h3>
            <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed max-w-[480px] mb-8">
              좋아하는 크리에이터의 옷이 ONFLEA 쇼핑몰에서 판매 중입니다. 지금 바로 만나보세요.
            </p>
            <div className="mt-auto">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[rgba(12,12,12,0.3)] text-[#0c0c0c] text-[12px] font-medium tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-[#0c0c0c] hover:text-white transition-colors"
              >
                쇼핑몰 바로가기
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
