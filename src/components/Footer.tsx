import Image from 'next/image'

const linkGroups = [
  {
    title: 'Company',
    links: [
      // 히어로가 sticky라 #hero 앵커가 동작하지 않음 → 문서 최상단으로
      { label: 'About', href: '#' },
      { label: 'Contact', href: 'mailto:contact@onflea.kr' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/onflea.official/', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-8">
          {/* 브랜드 */}
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/images/logo-horizontal-white.png"
              alt="ONFLEA(온플리)"
              width={1089}
              height={190}
              className="h-5 w-auto"
            />
            <p className="text-[12px] text-[rgba(255,255,255,0.35)]">ONFLEA(온플리) · 온라인 플리마켓 플랫폼</p>
            <p className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1 leading-relaxed">
              문의: contact@onflea.kr
            </p>
          </div>

          {/* 링크 그룹 */}
          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-[rgba(255,255,255,0.4)]">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-[13px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 사업자 정보 */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <p className="text-[11px] text-[rgba(255,255,255,0.3)] leading-relaxed">
            상호: 온플리 <span className="mx-1.5 text-[rgba(255,255,255,0.15)]">|</span> 대표: 이현도
            <span className="mx-1.5 text-[rgba(255,255,255,0.15)]">|</span> 사업자등록번호: 462-40-01367
            <br className="md:hidden" />
            <span className="hidden md:inline mx-1.5 text-[rgba(255,255,255,0.15)]">|</span>
            주소: 서울특별시 강남구 강남대로112길 47, 2층-778A호(논현동)
            <br />
            이메일: contact@onflea.kr <span className="mx-1.5 text-[rgba(255,255,255,0.15)]">|</span> 전화: 010-5648-4170
          </p>
        </div>

        {/* 하단 구분선 + 카피라이트 */}
        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[11px] text-[rgba(255,255,255,0.35)]">
            © 2026 ONFLEA. All rights reserved.
          </p>
          <p className="text-[11px] text-[rgba(255,255,255,0.25)]">
            Made with care by ONFLEA
          </p>
        </div>
      </div>
    </footer>
  )
}
