const trustItems = [
  {
    title: '상품별 실측 정보',
    desc: '어깨, 가슴, 총장 등 실측 데이터를 제공합니다.',
  },
  {
    title: '상태 확인 및 검수',
    desc: '착용감, 오염, 세탁 여부를 꼼꼼히 체크합니다.',
  },
  {
    title: '크리에이터 착용 이력',
    desc: '어떤 콘텐츠에서 착용되었는지 이력을 확인할 수 있습니다.',
  },
  {
    title: '크리에이터별 전용 페이지',
    desc: '좋아하는 크리에이터의 아이템을 한 페이지에서 모아볼 수 있습니다.',
  },
  {
    title: '안전한 결제 시스템',
    desc: '신뢰할 수 있는 결제 시스템으로 안심하고 구매할 수 있습니다.',
  },
  {
    title: '단일 재고 품절 처리',
    desc: '실시간 재고 관리로 중복 구매를 방지하고 공정한 구매 환경을 만듭니다.',
  },
]

export default function TrustSection() {
  return (
    <section id="trust" className="bg-[#f5f5f5] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">Trust</p>
        <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c] max-w-[672px] mb-5">
          믿고 구매할 수 있도록, 필요한 정보를 투명하게 제공합니다.
        </h2>
        <p className="text-base text-[rgba(12,12,12,0.55)] leading-relaxed max-w-[576px] mb-16">
          중고 의류 구매에서 가장 중요한 것은 정보와 신뢰입니다. ON-FLEA는 상품 상태, 실측, 가격, 배송 정보를 정리해 구매자가 더 쉽게 판단할 수 있도록 돕습니다.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-[rgba(12,12,12,0.08)]">
          {trustItems.map((item, i) => (
            <div key={i} className="bg-[#f5f5f5] p-8 md:p-10 flex flex-col gap-6">
              <div className="border border-[rgba(12,12,12,0.18)] size-10 flex items-center justify-center shrink-0">
                <span className="text-[rgba(12,12,12,0.35)] text-[10px]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0c0c0c] mb-2">{item.title}</h3>
                <p className="text-sm text-[rgba(12,12,12,0.5)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
