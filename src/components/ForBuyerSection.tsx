import { Globe, Search, ClipboardCheck, ShieldCheck, Tag } from 'lucide-react'
import { SHOP_URL } from '@/lib/constants'

const buyerBenefits = [
  { label: '지역 제한 없이 온라인 구매 가능',     icon: Globe },
  { label: '크리에이터별 상품 모아보기',           icon: Search },
  { label: '실측·상태 정보 기반의 투명한 구매',   icon: ClipboardCheck },
  { label: '안전한 결제와 배송',                   icon: ShieldCheck },
  { label: '정가보다 합리적인 리커머스 가격',      icon: Tag },
]

export default function ForBuyerSection() {
  return (
    <section id="buyer" className="bg-[#f5f5f5] py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* 왼쪽 — 혜택 리스트 */}
          <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties} className="order-2 md:order-1 bg-white border border-[rgba(12,12,12,0.1)]">
            {buyerBenefits.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-5 ${i < buyerBenefits.length - 1 ? 'border-b border-[rgba(12,12,12,0.07)]' : ''}`}
                >
                  <div className="border border-[rgba(12,12,12,0.14)] size-10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-[rgba(12,12,12,0.4)]" />
                  </div>
                  <p className="flex-1 text-[rgba(12,12,12,0.75)] text-sm font-medium">{s.label}</p>
                  <span className="text-[rgba(12,12,12,0.3)] text-sm">→</span>
                </div>
              )
            })}
          </div>

          {/* 오른쪽 — 텍스트 */}
          <div data-reveal className="order-1 md:order-2">
            <p className="text-[rgba(12,12,12,0.35)] text-[10px] font-bold tracking-[3px] uppercase mb-5">For Buyer</p>
            <h2 className="text-[#0c0c0c] text-4xl md:text-[56px] font-black leading-[1.25] mb-6">
              좋아하는 크리에이터의 옷을, 이제 온라인으로 만나보세요.
            </h2>
            <p className="text-[rgba(12,12,12,0.55)] text-base leading-relaxed max-w-[384px] mb-8">
              이제 특정 장소와 시간에 열리는 플리마켓을 기다리지 않아도 됩니다. ONFLEA에서는 크리에이터가 실제 착용했거나 소개한 의류를 온라인으로 확인하고 구매할 수 있습니다.
            </p>
            <div className="border-l-4 border-[#0c0c0c] pl-6 mb-10">
              <p className="text-[#0c0c0c] text-lg font-black leading-relaxed">
                플리마켓을 놓쳤다면,<br />ONFLEA에서 다시 만나요.
              </p>
              <p className="text-[rgba(12,12,12,0.45)] text-sm leading-relaxed mt-4">
                좋아서 고른 옷 한 벌이 작은 기부로 이어집니다.
              </p>
            </div>
            <a
              href={SHOP_URL}
              className="border border-[rgba(12,12,12,0.3)] text-[#0c0c0c] text-[12px] font-medium tracking-[2.16px] uppercase px-8 py-4 inline-flex items-center gap-2 hover:bg-[#0c0c0c] hover:text-white transition-colors"
            >
              지금 쇼핑하기
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
