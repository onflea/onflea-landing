const before = [
  '직접 촬영 준비 & 진행',
  '상품 설명 직접 작성',
  '구매 문의 일일이 응대',
  '포장 & 직접 발송',
  'CS 처리',
  '정산 직접 계산',
]

const after = [
  '문 앞 수거 (직접 방문)',
  '전문 촬영 & 상품 등록',
  '판매 운영 전체 대행',
  '배송 처리',
  'CS 대행',
  '판매 리포트 & 정산',
]

export default function ComparisonSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">
          Why ON-FLEA
        </p>
        <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c] mb-16">
          기존 방식과 무엇이<br />다른가요?
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-[rgba(12,12,12,0.08)]">
          {/* 기존 방식 */}
          <div className="bg-[#f5f5f5] p-10 md:p-14">
            <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[rgba(12,12,12,0.3)] mb-8">
              기존 직접 판매
            </p>
            <ul className="space-y-0 divide-y divide-[rgba(12,12,12,0.07)]">
              {before.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[rgba(12,12,12,0.2)] text-lg font-bold">✕</span>
                  <span className="text-sm text-[rgba(12,12,12,0.35)] line-through decoration-[rgba(12,12,12,0.2)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ON-FLEA */}
          <div className="bg-[#0c0c0c] p-10 md:p-14">
            <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#ff4d6d] mb-8">
              ON-FLEA
            </p>
            <ul className="space-y-0 divide-y divide-[rgba(255,255,255,0.07)]">
              {after.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[#ff4d6d] text-base font-bold">✓</span>
                  <span className="text-sm text-[rgba(255,255,255,0.8)] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 강조 문구 */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-[rgba(12,12,12,0.08)] pt-10">
          <p className="text-2xl md:text-3xl font-black text-[#0c0c0c] leading-snug">
            크리에이터는 <span className="text-[#ff4d6d]">옷만 문 앞에 두면</span> 됩니다.<br />
            나머지는 ON-FLEA가 모두 처리합니다.
          </p>
          <p className="text-sm text-[rgba(12,12,12,0.45)] leading-relaxed max-w-[320px] shrink-0">
            개인 중고거래나 오프라인 플리마켓에서 직접 챙겨야 했던 모든 과정을 ON-FLEA가 대신합니다.
          </p>
        </div>
      </div>
    </section>
  )
}
