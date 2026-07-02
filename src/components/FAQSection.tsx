'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '어떤 크리에이터가 입점할 수 있나요?',
    a: '패션, 데일리룩, 쇼핑하울, 룩북, 의류 리뷰 콘텐츠를 제작하는 크리에이터를 우선적으로 검토합니다. 팔로워 수보다 콘텐츠의 방향성을 중심으로 입점 여부를 판단합니다.',
  },
  {
    q: '크리에이터가 직접 판매해야 하나요?',
    a: '기본적으로 ONFLEA가 수거, 촬영, 검수, 상품 등록, 판매, 배송, CS, 정산까지 전 과정을 대행합니다. 다만 크리에이터가 직접 촬영하거나 SNS 홍보 등 일부 과정에 참여하고 싶은 경우, 협의를 통해 원하는 방식으로 조율할 수 있습니다.',
  },
  {
    q: '구매자는 어디서 상품을 구매하나요?',
    a: '크리에이터별 온라인 판매 페이지에서 상품 정보를 확인하고 구매할 수 있습니다. 별도의 오프라인 방문이나 앱 설치 없이 웹에서 바로 이용 가능합니다.',
  },
  {
    q: '상품 정보는 어떻게 제공되나요?',
    a: '상품 상태, 실측, 가격, 배송 정보, 착용·협찬 이력 등을 정리해 제공합니다. 구매자가 충분한 정보를 바탕으로 결정을 내릴 수 있도록 합니다.',
  },
  {
    q: '오프라인 플리마켓과 무엇이 다른가요?',
    a: 'ONFLEA는 장소와 시간의 제약 없이 온라인으로 언제든지 참여할 수 있습니다. 오픈런이나 추첨 없이 원하는 상품을 편리하게 구매할 수 있습니다.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[352px_1fr] gap-16 md:gap-24">
          {/* 왼쪽 — 타이틀 */}
          <div>
            <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-4">
              FAQ
            </p>
            <h2 className="text-[36px] font-black leading-[1.1] text-[#0c0c0c]">
              자주 묻는<br />질문
            </h2>
          </div>

          {/* 오른쪽 — 아코디언 */}
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-[rgba(12,12,12,0.08)] ${i === 0 ? 'border-t' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full py-6 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-[16px] font-bold text-[#0c0c0c] pr-8">{faq.q}</span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-[rgba(12,12,12,0.4)] transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <p className="text-sm text-[rgba(12,12,12,0.55)] leading-relaxed pb-6 pr-8">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
