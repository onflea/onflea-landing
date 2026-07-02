import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[rgba(12,12,12,0.1)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" aria-label="ON-FLEA 홈">
          <Image
            src="/images/logo-horizontal-black.png"
            alt="ON-FLEA"
            width={1089}
            height={190}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[rgba(12,12,12,0.6)] hover:text-[#0c0c0c] transition-colors"
        >
          <ArrowLeft size={16} />
          홈으로
        </Link>
      </div>
    </header>
  )
}
