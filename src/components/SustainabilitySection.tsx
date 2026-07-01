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
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#ff4d6d]">
              <path d="M6.5 1C3.46 1 1 3.46 1 6.5S3.46 12 6.5 12 12 9.54 12 6.5 9.54 1 6.5 1z" stroke="#ff4d6d" strokeWidth="1.2"/>
              <path d="M6.5 4v5M4 6.5h5" stroke="#ff4d6d" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-[#ff4d6d] text-[10px] font-bold tracking-[2.5px] uppercase">
              Sustainability
            </p>
          </div>
        </div>

        {/* 메인 헤딩 */}
        <h2 className="text-center text-white text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.25] mb-8">
          입지 않는 옷에<br />새로운 시간을 더합니다.
        </h2>

        {/* 설명 */}
        <p className="text-center text-[rgba(255,255,255,0.5)] text-base md:text-lg leading-relaxed max-w-[576px] mx-auto mb-12">
          촬영 후 옷장에 머무르던 의류가 누군가의 일상에서 다시 쓰일 수 있다면, 패션 소비는 더 가볍고 지속가능해질 수 있습니다.
        </p>

        {/* 인용 박스 */}
        <div className="flex justify-center">
          <div className="border border-[rgba(255,77,109,0.25)] px-8 py-7 max-w-[576px] w-full">
            <p className="text-[#ff4d6d] text-lg font-black text-center leading-relaxed">
              &ldquo;ON-FLEA는 버려질 수 있는 옷을 다시 입히는<br />리커머스 경험을 만듭니다.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
