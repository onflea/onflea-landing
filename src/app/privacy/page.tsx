import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'

export const metadata = {
  title: '개인정보처리방침 | ONFLEA(온플리)',
  description: 'ONFLEA(온플리)의 개인정보처리방침입니다.',
  alternates: {
    canonical: '/privacy',
  },
}

const sections = [
  {
    title: '1. 총칙',
    body: 'ONFLEA(이하 "회사")는 이용자의 개인정보를 소중하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 노력합니다. 본 방침은 회사가 제공하는 서비스(이하 "서비스") 이용과 관련하여 개인정보를 수집·이용·보관·파기하는 절차와 방법을 안내합니다.',
  },
  {
    title: '2. 수집하는 개인정보 항목 및 수집 방법',
    body: [
      '가. 수집 항목',
      '· 입점 문의 시: 이름, 이메일, 채널 링크(선택), 문의 내용',
      '· 오픈 알림 신청 시: 이름(선택), 이메일',
      '· 서비스 이용 과정에서 자동으로 수집되는 정보: 접속 IP, 쿠키, 방문 일시, 기기 정보, 브라우저 정보, 운영체제(OS), 서비스 이용 기록',
      '',
      '나. 수집 방법',
      '· 웹사이트 문의 및 신청 폼',
      '· 이메일 문의',
      '· 서비스 이용 과정에서 자동으로 생성되는 정보의 수집',
    ],
  },
  {
    title: '3. 개인정보의 수집 및 이용 목적',
    body: [
      '· 입점 문의 및 서비스 신청에 대한 응답',
      '· 서비스 이용에 필요한 안내, 공지사항 전달',
      '· 부정 이용 방지 및 서비스 품질 개선',
      '· 통계 분석 및 마케팅 활용(별도 동의 시)',
    ],
  },
  {
    title: '4. 개인정보의 보유 및 이용 기간',
    body: '입점 문의 및 오픈 알림 신청 정보는 목적 달성 후 또는 이용자의 삭제 요청 시까지 보관합니다. 다만 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령에 따라 보관이 필요한 경우에는 해당 기간 동안 보관합니다.',
  },
  {
    title: '5. 개인정보의 제3자 제공',
    body: '회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자의 사전 동의가 있거나 법령에 의한 요청이 있는 경우에는 예외적으로 제공할 수 있습니다.',
  },
  {
    title: '6. 개인정보 처리의 위탁',
    body: [
      '회사는 원활한 서비스 운영을 위해 아래와 같이 개인정보 처리 업무를 외부 전문업체에 위탁하고 있으며, 위탁 계약 시 개인정보 보호 관련 법령을 준수하도록 관리·감독하고 있습니다.',
      '',
      '· Formspree Inc. — 웹사이트 문의 및 신청 폼 데이터 수집·저장',
      '· Vercel Inc. — 웹사이트 호스팅 및 접속 로그 관리',
      '· Google LLC / Vercel Inc. — 방문자 통계 분석 (Analytics)',
      '',
      '위탁 업체가 변경되거나 위탁 업무의 내용이 변경될 경우 본 방침을 통해 지체 없이 공지합니다.',
    ],
  },
  {
    title: '7. 쿠키(Cookie)의 이용',
    body: [
      '회사는 이용자에게 맞춤형 서비스를 제공하고 방문 통계를 분석하기 위해 쿠키를 사용할 수 있습니다.',
      '',
      '· 쿠키 사용 목적: 접속 빈도 및 방문 시간 분석, 이용자의 이용 형태 파악을 통한 서비스 개선',
      '· 쿠키 설정 거부 방법: 웹 브라우저 설정 > 개인정보 보호 > 쿠키 차단/삭제를 통해 언제든지 거부할 수 있습니다. 다만 쿠키 저장을 거부하는 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.',
    ],
  },
  {
    title: '8. 이용자의 권리',
    body: '이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수 있으며, 요청은 contact@onflea.kr로 문의해 주시기 바랍니다.',
  },
  {
    title: '9. 개인정보 보호책임자',
    body: [
      '· 담당자: ONFLEA 팀',
      '· 이메일: contact@onflea.kr',
      '',
      '개인정보 처리와 관련된 문의, 불만 처리, 피해 구제 등은 위 연락처로 문의해 주시기 바랍니다.',
    ],
  },
  {
    title: '10. 개정 이력',
    body: '· 시행일자: 2026년 7월 1일',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <LegalHeader />
      <main className="bg-white min-h-screen">
        <div className="max-w-[880px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-[10px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.35)] mb-4">
            Privacy Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#0c0c0c] mb-4">
            개인정보처리방침
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
                      <p
                        key={i}
                        className={`text-[15px] leading-relaxed ${
                          line === '' ? 'h-2' : 'text-[rgba(12,12,12,0.7)]'
                        }`}
                      >
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
