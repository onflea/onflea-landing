import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'

export const metadata = {
  title: '이용약관 | ON-FLEA',
  description: 'ON-FLEA 서비스 이용약관입니다.',
}

const sections = [
  {
    title: '제1조 (목적)',
    body: '본 약관은 ON-FLEA(이하 "회사")가 제공하는 온라인 플리마켓 및 위탁 판매 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (용어의 정의)',
    body: [
      '· "서비스"란 회사가 제공하는 크리에이터 위탁 판매 대행 및 관련 온라인 플리마켓 서비스를 의미합니다.',
      '· "크리에이터"란 회사에 의류의 위탁 판매를 의뢰하는 자를 말합니다.',
      '· "구매자"란 서비스를 통해 상품을 구매하는 자를 말합니다.',
      '· "위탁 상품"이란 크리에이터가 판매를 의뢰한 의류 및 관련 물품을 의미합니다.',
    ],
  },
  {
    title: '제3조 (약관의 효력 및 개정)',
    body: '본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 사전에 공지합니다.',
  },
  {
    title: '제4조 (서비스의 제공)',
    body: [
      '회사는 다음과 같은 서비스를 제공합니다.',
      '· 위탁 상품의 수거 및 접수',
      '· 상품 촬영, 검수, 상품 정보 정리',
      '· 상품 등록 및 판매 페이지 운영',
      '· 구매자 응대(CS) 및 배송 관리',
      '· 판매 결과 정산 및 리포트 제공',
    ],
  },
  {
    title: '제5조 (크리에이터의 의무)',
    body: [
      '· 위탁 상품은 정상적으로 판매 가능한 상태여야 하며, 위조품·모조품 등은 취급하지 않습니다.',
      '· 크리에이터는 신청 시 제공한 정보의 정확성을 보증합니다.',
      '· 판매 진행 중 상품 회수를 원할 경우, 회사와 사전에 협의합니다.',
    ],
  },
  {
    title: '제6조 (회사의 의무)',
    body: [
      '· 회사는 위탁받은 상품을 성실히 관리하고, 판매 진행 상황을 크리에이터에게 안내합니다.',
      '· 회사는 이용자의 개인정보를 관련 법령에 따라 안전하게 보호합니다.',
      '· 회사는 서비스 운영과 관련한 문의에 성실히 응대합니다.',
    ],
  },
  {
    title: '제7조 (판매 정산)',
    body: '판매 대금은 회사와 크리에이터가 사전에 합의한 조건에 따라 정산됩니다. 정산 주기, 수수료, 정산 방법 등 세부 사항은 별도의 개별 계약 또는 안내를 통해 정합니다.',
  },
  {
    title: '제8조 (구매 및 배송)',
    body: [
      '· 상품 구매는 결제 완료 시 계약이 성립됩니다.',
      '· 배송은 결제 완료 후 영업일 기준 정해진 기간 내에 진행됩니다.',
      '· 재고는 단일 수량이 원칙이며, 결제 순서에 따라 판매됩니다.',
    ],
  },
  {
    title: '제9조 (교환 및 환불)',
    body: '상품의 특성상 단순 변심에 의한 교환·환불은 제한될 수 있습니다. 상품 상태 불량, 오배송 등 회사 및 크리에이터의 귀책 사유가 있는 경우에는 관련 법령에 따라 처리합니다.',
  },
  {
    title: '제10조 (책임의 제한)',
    body: '천재지변, 불가항력, 이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해서는 회사가 책임지지 않습니다.',
  },
  {
    title: '제11조 (분쟁 해결 및 관할)',
    body: '서비스 이용과 관련하여 회사와 이용자 간에 발생한 분쟁에 대해서는 상호 협의하여 해결하는 것을 원칙으로 하며, 협의가 되지 않을 경우 관련 법령에 따른 관할 법원에서 해결합니다.',
  },
  {
    title: '부칙',
    body: '본 약관은 2026년 7월 1일부터 시행합니다.',
  },
]

export default function TermsPage() {
  return (
    <>
      <LegalHeader />
      <main className="bg-white min-h-screen">
        <div className="max-w-[880px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-4">
            Terms of Service
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#0c0c0c] mb-4">
            이용약관
          </h1>
          <p className="text-sm text-[rgba(12,12,12,0.5)] mb-12">
            시행일자: 2026년 7월 1일
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg md:text-xl font-bold text-[#0c0c0c] mb-4">
                  {s.title}
                </h2>
                {Array.isArray(s.body) ? (
                  <div className="space-y-1">
                    {s.body.map((line, i) => (
                      <p key={i} className="text-[15px] text-[rgba(12,12,12,0.7)] leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[15px] text-[rgba(12,12,12,0.7)] leading-relaxed">
                    {s.body}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
