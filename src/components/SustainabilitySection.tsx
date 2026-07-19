const cycles = [
  {
    num: '01',
    title: '다시 입는 옷',
    desc: '촬영 후 옷장에 잠들어 있던 의류가 팬의 일상에서 새 주인을 만납니다.',
  },
  {
    num: '02',
    title: '수익의 선순환',
    desc: '판매 수익의 일부는 크리에이터의 이름으로 기부에 참여합니다.',
  },
]

export default function SustainabilitySection() {
  return (
    <section className="relative bg-[#0c0c0c] text-white py-24 md:py-40 overflow-hidden min-h-[600px] flex items-center">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=90&auto=format&fit=crop')`,
        }}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,12,12,0.7)] via-[rgba(12,12,12,0.5)] to-[rgba(12,12,12,0.75)]" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* 센터 라벨 */}
        <div data-reveal className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1C3.46 1 1 3.46 1 6.5S3.46 12 6.5 12 12 9.54 12 6.5 9.54 1 6.5 1z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
              <path d="M6.5 4v5M4 6.5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-[rgba(255,255,255,0.6)] text-[10px] font-bold tracking-[2.5px] uppercase">
              Sustainability
            </p>
          </div>
        </div>

        {/* 메인 헤딩 */}
        <h2 data-reveal style={{ '--reveal-delay': '80ms' } as React.CSSProperties} className="text-center text-white text-4xl md:text-[48px] lg:text-[64px] font-black leading-[1.25] mb-8">
          입지 않는 옷에<br />새로운 시간을 더합니다.
        </h2>

        {/* 설명 */}
        <p data-reveal style={{ '--reveal-delay': '160ms' } as React.CSSProperties} className="text-center text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed max-w-[576px] mx-auto mb-12">
          촬영 후 옷장에 머무르던 의류가 누군가의 일상에서 다시 쓰일 수 있다면, 패션 소비는 더 가볍고 지속가능해질 수 있습니다. ONFLEA는 이 순환이 거래에서 멈추지 않도록 설계합니다.
        </p>

        {/* 선순환 2단계 */}
        <div data-reveal className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.12)] max-w-[640px] mx-auto mb-12">
          {cycles.map((c) => (
            <div key={c.num} className="bg-[rgba(12,12,12,0.65)] p-7 md:p-8">
              <p className="text-[rgba(255,255,255,0.25)] text-[9px] font-black tracking-[2.25px] uppercase mb-3">
                Cycle {c.num}
              </p>
              <h3 className="text-white text-base font-black mb-2">{c.title}</h3>
              <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* 인용 박스 */}
        <div data-reveal className="flex justify-center">
          <div className="border border-[rgba(255,255,255,0.15)] px-8 py-7 max-w-[576px] w-full">
            <p className="text-white text-lg font-black text-center leading-relaxed">
              &ldquo;ONFLEA는 옷장에 잠들어 있던 옷을 다시<br />세상으로 잇는 리커머스 경험을 만듭니다.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
