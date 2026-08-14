'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { SHOP_URL } from '@/lib/constants'

const DISMISS_KEY = 'onflea_open_notice_dismissed'

/* 정식 오픈 안내 바 — 닫으면 다시 표시하지 않음. 오픈 홍보 기간이 지나면 Navbar에서 제거 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(DISMISS_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <div className="bg-[#0c0c0c] border-b border-[rgba(255,255,255,0.12)]">
      <div className="max-w-[1280px] mx-auto px-10 md:px-12 h-10 flex items-center justify-center gap-3 relative">
        <p className="text-[12px] tracking-wide text-[rgba(255,255,255,0.7)] truncate">
          ONFLEA 온라인 플리마켓에서 판매가 진행중입니다
        </p>
        <a
          href={SHOP_URL}
          className="text-[12px] font-bold text-white underline underline-offset-4 shrink-0 hover:opacity-70 transition-opacity"
        >
          쇼핑몰 바로가기 →
        </a>
        <button
          onClick={dismiss}
          aria-label="공지 닫기"
          className="absolute right-3 md:right-4 p-1 text-[rgba(255,255,255,0.45)] hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
