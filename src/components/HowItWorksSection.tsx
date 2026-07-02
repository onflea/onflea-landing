'use client'

import { useState } from 'react'
import { FileText, Truck, Camera, Globe, BarChart2, Search, CreditCard, Package } from 'lucide-react'

const creatorSteps = [
  { num: '01', title: '입점 문의',         desc: '간단한 입점 신청서를 작성하면 ON-FLEA 팀이 검토 후 연락드립니다.', icon: FileText },
  { num: '02', title: '문 앞 수거',         desc: '판매할 의류를 문 앞에 두시면 ON-FLEA가 직접 방문해 수거합니다.', icon: Truck },
  { num: '03', title: '촬영 · 검수 · 등록', desc: '수거한 의류를 촬영하고 상태를 꼼꼼히 검수한 후 상품 페이지에 등록합니다.', icon: Camera },
  { num: '04', title: '페이지 오픈',        desc: '크리에이터 전용 판매 페이지가 열리고 팬들이 상품을 구매합니다.', icon: Globe },
  { num: '05', title: '판매 후 정산',       desc: '판매 완료 후 결과 리포트와 함께 정산이 이루어집니다.', icon: BarChart2 },
]

const buyerSteps = [
  { num: '01', title: '페이지 방문', desc: '좋아하는 크리에이터의 전용 판매 페이지에 접속합니다.', icon: Globe },
  { num: '02', title: '상품 탐색',   desc: '실측·상태 정보를 확인하며 원하는 상품을 선택합니다.', icon: Search },
  { num: '03', title: '온라인 결제', desc: '안전한 결제 시스템으로 간편하게 구매합니다.', icon: CreditCard },
  { num: '04', title: '배송 수령',   desc: '크리에이터의 아이템을 나의 일상에서 착용합니다.', icon: Package },
]

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'creator' | 'buyer'>('creator')
  const steps = activeTab === 'creator' ? creatorSteps : buyerSteps

  return (
    <section id="how-it-works" className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">
              How It Works
            </p>
            <h2 className="text-4xl md:text-[56px] font-black leading-[1.5] text-[#0c0c0c]">
              ON-FLEA 이용 방법
            </h2>
          </div>

          <div className="border border-[rgba(12,12,12,0.14)] p-px flex self-start">
            <button
              onMouseEnter={() => setActiveTab('creator')}
              onClick={() => setActiveTab('creator')}
              className={`px-7 py-3 text-[12px] font-bold tracking-[1.8px] uppercase transition-colors ${
                activeTab === 'creator' ? 'bg-[#0c0c0c] text-white' : 'text-[rgba(12,12,12,0.45)] hover:text-[#0c0c0c]'
              }`}
            >
              크리에이터
            </button>
            <button
              onMouseEnter={() => setActiveTab('buyer')}
              onClick={() => setActiveTab('buyer')}
              className={`px-7 py-3 text-[12px] font-bold tracking-[1.8px] uppercase transition-colors ${
                activeTab === 'buyer' ? 'bg-[#0c0c0c] text-white' : 'text-[rgba(12,12,12,0.45)] hover:text-[#0c0c0c]'
              }`}
            >
              구매자
            </button>
          </div>
        </div>

        <div className="grid gap-px bg-[rgba(12,12,12,0.08)]" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.num} className="bg-white p-6 md:p-8 flex flex-col">
                <div className="relative w-11 h-11 mb-5 shrink-0">
                  {/* 뒤쪽 오프셋 박스 */}
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[rgba(12,12,12,0.08)]" aria-hidden />
                  {/* 메인 아이콘 박스 */}
                  <div className="relative w-11 h-11 bg-[#0c0c0c] flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <p className="text-[9px] font-black tracking-[2.25px] text-[rgba(12,12,12,0.25)] mb-2 uppercase">
                  STEP {s.num}
                </p>
                <h3 className="text-sm font-black text-[#0c0c0c] mb-2">{s.title}</h3>
                <p className="text-xs text-[rgba(12,12,12,0.45)] leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
