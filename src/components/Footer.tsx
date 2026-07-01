import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] py-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* 로고 + 서브타이틀 */}
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo-horizontal-white.png"
              alt="ON-FLEA"
              width={160}
              height={28}
              className="h-7 w-auto"
            />
            <p className="text-[12px] text-[rgba(255,255,255,0.25)]">온라인 리커머스 플랫폼</p>
          </div>

          {/* 카피라이트 */}
          <p className="text-[12px] text-[rgba(255,255,255,0.2)]">
            © 2025 ON-FLEA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
