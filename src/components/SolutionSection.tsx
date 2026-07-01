const solutions = [
  {
    num: '01',
    title: '판매는 더 쉽게',
    desc: '문 앞에 두면 ON-FLEA가 직접 수거합니다. 촬영·배송·CS 등 판매의 모든 번거로움은 저희가 대신합니다.',
  },
  {
    num: '02',
    title: '구매는 더 가깝게',
    desc: '지역에 상관없이 온라인으로 크리에이터의 옷을 만날 수 있습니다. 오픈런과 먼 거리 걱정 없이.',
  },
  {
    num: '03',
    title: '정보는 더 투명하게',
    desc: '실측·상태·가격 정보를 꼼꼼히 정리해 망설임 없는 구매 결정을 도와드립니다.',
  },
]

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-white pt-8 md:pt-12 pb-24 md:pb-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-5">
          Solution
        </p>
        <h2 className="text-4xl md:text-[56px] font-black leading-[1.25] text-[#0c0c0c] max-w-[768px] mb-16">
          크리에이터와 팬 모두에게<br />더 나은 경험을 만듭니다.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-[rgba(12,12,12,0.08)]">
          {solutions.map((s) => (
            <div key={s.num} className="bg-white p-10 md:p-12">
              <p className="text-[80px] font-black leading-none text-[rgba(12,12,12,0.06)] select-none">
                {s.num}
              </p>
              <h3 className="text-[20px] font-black text-[#0c0c0c] mt-8 mb-3">{s.title}</h3>
              <p className="text-sm text-[rgba(12,12,12,0.55)] leading-relaxed max-w-[298px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
