'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { SHOP_URL } from '@/lib/constants'
import AnnouncementBar from '@/components/AnnouncementBar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openCreator } = useModal()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: '크리에이터', href: '#creator' },
    { label: '구매자', href: '#buyer' },
    { label: '서비스 안내', href: '#how-it-works' },
    { label: '소식', href: '/news' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'bg-white border-[rgba(12,12,12,0.1)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <AnnouncementBar />
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* 히어로가 sticky라 #hero 앵커는 스크롤 거리가 0으로 계산됨 → 최상단으로 직접 스크롤 */}
        <a
          href="#hero"
          aria-label="ONFLEA 홈"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <Image
            src={scrolled || menuOpen ? '/images/logo-horizontal-black.png' : '/images/logo-horizontal-white.png'}
            alt="ONFLEA"
            width={1089}
            height={190}
            className="h-7 w-auto"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="주요 메뉴">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                scrolled
                  ? 'text-[#0c0c0c] hover:text-[rgba(12,12,12,0.5)]'
                  : 'text-white hover:text-[rgba(255,255,255,0.6)]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            className={`text-sm font-medium px-5 py-2.5 border transition-colors ${
              scrolled || menuOpen
                ? 'border-[rgba(12,12,12,0.25)] text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white hover:border-[#0c0c0c]'
                : 'border-[rgba(255,255,255,0.4)] text-white hover:border-white'
            }`}
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            쇼핑몰 바로가기
          </a>
          <button
            className="bg-[#0c0c0c] text-white text-sm font-bold px-5 py-2.5 tracking-[1.8px] uppercase hover:bg-[#333] transition-colors"
            onClick={openCreator}
          >
            입점 문의하기
          </button>
        </div>

        <button
          className={`md:hidden p-1 ${scrolled || menuOpen ? 'text-[#0c0c0c]' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f5f5f5] border-t border-[rgba(12,12,12,0.1)] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[#0c0c0c]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-sm border border-[rgba(12,12,12,0.25)] text-[#0c0c0c] font-medium px-5 py-3 text-center"
          >
            쇼핑몰 바로가기
          </a>
          <button
            onClick={() => { setMenuOpen(false); openCreator() }}
            className="text-sm bg-[#0c0c0c] text-white font-bold px-5 py-3 text-center tracking-[1.8px] uppercase"
          >
            입점 문의하기
          </button>
        </div>
      )}
    </header>
  )
}
