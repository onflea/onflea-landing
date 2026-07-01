'use client'

import { useState } from 'react'

const creatorProblems = [
  '"옷은 쌓이지만 판매할 시간이 없어요."',
  '"촬영·배송·CS가 부담되요."',
  '"브랜드 이미지에 맞는 판매 채널이 필요해요."',
]

const buyerProblems = [
  '"플리마켓에 직접 가기 어려워요."',
  '"오픈런, 추첨 경쟁이 부담되요."',
  '"상태·실측 정보가 부족해서 구매가 망설여져요."',
]

export default function ProblemSection() {
  const [focused, setFocused] = useState<'creator' | 'buyer'>('creator')

  return (
    <section id="problem" className="bg-[#f5f5f5] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">
          Problem
        </p>
        <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c] mb-16">
          플리마켓은 좋지만,<br />너무 번거롭고 멀었습니다.
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-[rgba(12,12,12,0.1)]">
          {/* 크리에이터 카드 */}
          <div
            className={`p-10 md:p-14 transition-colors duration-300 cursor-default ${
              focused === 'creator' ? 'bg-[#0c0c0c]' : 'bg-[#f5f5f5]'
            }`}
            onMouseEnter={() => setFocused('creator')}
          >
            <p className={`text-[10px] font-bold tracking-[2.5px] uppercase mb-5 transition-colors duration-300 ${
              focused === 'creator' ? 'text-[#ff4d6d]' : 'text-[rgba(12,12,12,0.35)]'
            }`}>크리에이터</p>
            <p className={`text-base md:text-lg leading-relaxed mb-10 max-w-[480px] transition-colors duration-300 ${
              focused === 'creator' ? 'text-white' : 'text-[#0c0c0c]'
            }`}>
              패션 크리에이터는 매달 협찬, 리뷰, 촬영 의류를 받지만 <br />영상 이후에는 옷장 속 재고로 쌓이기 쉽습니다.
            </p>
            <ul className="space-y-3">
              {creatorProblems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className={`w-1 h-1 rounded-full shrink-0 transition-colors duration-300 ${
                    focused === 'creator' ? 'bg-[#ff4d6d]' : 'bg-[rgba(12,12,12,0.4)]'
                  }`} />
                  <span className={`text-sm transition-colors duration-300 ${
                    focused === 'creator' ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(12,12,12,0.55)]'
                  }`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 팬·소비자 카드 */}
          <div
            className={`p-10 md:p-14 transition-colors duration-300 cursor-default ${
              focused === 'buyer' ? 'bg-[#0c0c0c]' : 'bg-[#f5f5f5]'
            }`}
            onMouseEnter={() => setFocused('buyer')}
          >
            <p className={`text-[10px] font-bold tracking-[2.5px] uppercase mb-5 transition-colors duration-300 ${
              focused === 'buyer' ? 'text-[#ff4d6d]' : 'text-[rgba(12,12,12,0.35)]'
            }`}>팬 · 소비자</p>
            <p className={`text-base md:text-lg leading-relaxed mb-10 max-w-[480px] transition-colors duration-300 ${
              focused === 'buyer' ? 'text-white' : 'text-[#0c0c0c]'
            }`}>
              팬들은 크리에이터가 입은 옷을 사고 싶지만 <br />오프라인 플리마켓은 대부분 수도권에 집중되어 있습니다.
            </p>
            <ul className="space-y-3">
              {buyerProblems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className={`w-1 h-1 rounded-full shrink-0 transition-colors duration-300 ${
                    focused === 'buyer' ? 'bg-[#ff4d6d]' : 'bg-[rgba(12,12,12,0.4)]'
                  }`} />
                  <span className={`text-sm transition-colors duration-300 ${
                    focused === 'buyer' ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(12,12,12,0.55)]'
                  }`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
