'use client'

import { Package, Camera, Ruler, LayoutGrid, CreditCard, BarChart2 } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const services = [
  { label: '의류 수거 및 위탁 접수',       icon: Package },
  { label: '상품 촬영 및 검수',             icon: Camera },
  { label: '실측·상태 정보 정리',           icon: Ruler },
  { label: '크리에이터별 판매 페이지 구성', icon: LayoutGrid },
  { label: '온라인 결제 및 배송',           icon: CreditCard },
  { label: '판매 결과 정산 및 리포트',      icon: BarChart2 },
]

export default function ForCreatorSection() {
  const { openCreator } = useModal()
  return (
    <section id="creator" className="bg-[#0c0c0c] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* 왼쪽 — 텍스트 */}
          <div data-reveal className="flex flex-col">
            <p className="text-[rgba(255,255,255,0.5)] text-[10px] font-bold tracking-[3px] uppercase mb-5">For Creator</p>
            <h2 className="text-white text-4xl md:text-[56px] font-black leading-[1.25] mb-6">
              옷장에 쌓인<br />협찬·리뷰 의류,<br />이제 쉽게 판매하세요.
            </h2>
            <p className="text-[rgba(255,255,255,0.5)] text-base leading-relaxed mb-8">
              콘텐츠 촬영 후 남은 의류를 직접 중고거래로 판매하는 일은 생각보다 어렵습니다.<br />ONFLEA는 상품화부터 배송과 정산까지 전 과정을 대신 처리합니다.
            </p>
            <div className="mb-8">
              <div className="border-l-4 border-white pl-5">
                <p className="text-white text-xl font-black">&ldquo;옷만 문앞에 두세요.<br />나머지는 저희가 대신 해드려요.&rdquo;</p>
                <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed mt-4">
                  판매 수익의 일부는 크리에이터의 이름으로 기부에 참여합니다.
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={openCreator}
                className="bg-white text-[#0c0c0c] text-[12px] font-bold tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-[#f5f5f5] transition-colors"
              >
                입점 문의하기
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* 오른쪽 — 서비스 리스트 */}
          <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="border border-[rgba(255,255,255,0.1)]">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-5 ${i < services.length - 1 ? 'border-b border-[rgba(255,255,255,0.08)]' : ''}`}
                >
                  <div className="border border-[rgba(255,255,255,0.18)] size-10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-white opacity-80" />
                  </div>
                  <p className="flex-1 text-[rgba(255,255,255,0.75)] text-sm font-medium">{s.label}</p>
                  <span className="text-[rgba(255,255,255,0.3)] text-sm">→</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
