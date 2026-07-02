'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useModal } from '@/context/ModalContext'

const STORAGE_KEYS = {
  creator: 'onflea_creator_submitted',
  buyer: 'onflea_buyer_submitted',
} as const

function readSubmission(key: string) {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as { email: string; at: string }
  } catch {
    return null
  }
}

function saveSubmission(key: string, email: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify({ email, at: new Date().toISOString() }))
  } catch {
    // ignore quota errors
  }
}

function ConsentCheckbox({
  checked,
  onChange,
  required = false,
  label,
  href,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  required?: boolean
  label: string
  href?: string
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-[3px] size-4 accent-[#0c0c0c] cursor-pointer shrink-0"
      />
      <span className="text-[13px] text-[rgba(12,12,12,0.65)] leading-relaxed">
        <span className="text-[#0c0c0c] font-semibold">
          {required ? '[필수]' : '[선택]'}
        </span>{' '}
        {label}
        {href && (
          <>
            {' '}
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#0c0c0c]"
            >
              자세히 보기
            </Link>
          </>
        )}
      </span>
    </label>
  )
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
      onClick={onClose}
    />
  )
}

function AlreadySubmitted({
  onClose,
  title,
  email,
  buttonClass,
}: {
  onClose: () => void
  title: string
  email: string
  buttonClass: string
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-6">
      <div className="w-12 h-12 bg-[#0c0c0c] flex items-center justify-center">
        <span className="text-white text-xl font-bold">✓</span>
      </div>
      <p className="text-[#0c0c0c] font-bold text-lg">{title}</p>
      <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed">
        이미 <span className="text-[#0c0c0c] font-medium">{email}</span>로<br />
        신청 내역이 접수되어 있어요.
      </p>
      <button
        onClick={onClose}
        className={`mt-2 w-full text-sm font-semibold py-4 transition-colors ${buttonClass}`}
      >
        닫기
      </button>
    </div>
  )
}

function CreatorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', channelUrl: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previous, setPrevious] = useState<{ email: string; at: string } | null>(null)
  const [agreed, setAgreed] = useState(false)
  const [marketingAgreed, setMarketingAgreed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setPrevious(readSubmission(STORAGE_KEYS.creator))
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://formspree.io/f/mqevgzoq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          channelUrl: form.channelUrl,
          source: 'ONFLEA 입점 문의',
          privacyConsent: true,
          marketingConsent: marketingAgreed,
          consentedAt: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error('submit-failed')
      saveSubmission(STORAGE_KEYS.creator, form.email)
      setSubmitted(true)
    } catch {
      setError('전송에 실패했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white w-full max-w-[520px] relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[rgba(12,12,12,0.35)] hover:text-[#0c0c0c] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-8">
          <p className="text-[rgba(12,12,12,0.4)] text-[11px] font-semibold tracking-[2.5px] uppercase mb-2">For Creator</p>
          <h2 className="text-[#0c0c0c] text-[28px] font-bold mb-2">입점 문의하기</h2>
          <p className="text-[rgba(12,12,12,0.5)] text-sm mb-8">정보를 남겨주시면 ONFLEA 팀이 직접 연락드립니다.</p>

          {previous && !submitted ? (
            <AlreadySubmitted
              onClose={onClose}
              title="이미 문의하셨어요."
              email={previous.email}
              buttonClass="bg-[#0c0c0c] text-white hover:bg-[#333]"
            />
          ) : submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-12 h-12 bg-[#0c0c0c] flex items-center justify-center">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <p className="text-[#0c0c0c] font-bold text-lg">문의가 접수되었습니다.</p>
              <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed">
                ONFLEA 팀이 확인 후<br />
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 hover:bg-[#333] transition-colors"
              >
                닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">이름</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="홍길동"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">이메일</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="hello@example.com"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">채널 링크</label>
                <input
                  value={form.channelUrl}
                  onChange={e => setForm(f => ({ ...f, channelUrl: e.target.value }))}
                  placeholder="유튜브, 인스타그램 등 채널 URL"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <div className="mt-1 pt-4 border-t border-[rgba(12,12,12,0.08)] flex flex-col gap-2.5">
                <ConsentCheckbox
                  checked={agreed}
                  onChange={setAgreed}
                  required
                  label="개인정보 수집 및 이용에 동의합니다."
                  href="/privacy"
                />
                <ConsentCheckbox
                  checked={marketingAgreed}
                  onChange={setMarketingAgreed}
                  label="이벤트·프로모션 정보 수신에 동의합니다."
                />
              </div>
              {error && (
                <p className="text-[13px] text-red-600 -mb-1">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '전송 중...' : '문의 보내기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function BuyerModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previous, setPrevious] = useState<{ email: string; at: string } | null>(null)
  const [agreed, setAgreed] = useState(false)
  const [marketingAgreed, setMarketingAgreed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setPrevious(readSubmission(STORAGE_KEYS.buyer))
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://formspree.io/f/meebpjwr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          source: 'ONFLEA 오픈 알림',
          privacyConsent: true,
          marketingConsent: marketingAgreed,
          consentedAt: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error('submit-failed')
      saveSubmission(STORAGE_KEYS.buyer, email)
      setSubmitted(true)
    } catch {
      setError('전송에 실패했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white w-full max-w-[520px] relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[rgba(12,12,12,0.35)] hover:text-[#0c0c0c] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-8">
          <p className="text-[rgba(12,12,12,0.4)] text-[11px] font-semibold tracking-[2.5px] uppercase mb-2">For Buyer</p>
          <h2 className="text-[#0c0c0c] text-[28px] font-bold mb-2">오픈 알림 받기</h2>
          <p className="text-[rgba(12,12,12,0.5)] text-sm mb-8">좋아하는 크리에이터의 옷을 가장 먼저 만나보고 싶다면 이메일을 남겨주세요.</p>

          {previous && !submitted ? (
            <AlreadySubmitted
              onClose={onClose}
              title="이미 신청하셨어요."
              email={previous.email}
              buttonClass="bg-[#0c0c0c] text-white hover:bg-[#333]"
            />
          ) : submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-12 h-12 bg-[#0c0c0c] flex items-center justify-center">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <p className="text-[#0c0c0c] font-bold text-lg">신청 완료!</p>
              <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed">
                오픈 시 가장 먼저 알려드리겠습니다.<br />
                관심 가져주셔서 감사합니다.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 hover:bg-[#333] transition-colors"
              >
                닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">이름</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="홍길동"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">이메일</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <div className="mt-1 pt-4 border-t border-[rgba(12,12,12,0.08)] flex flex-col gap-2.5">
                <ConsentCheckbox
                  checked={agreed}
                  onChange={setAgreed}
                  required
                  label="개인정보 수집 및 이용에 동의합니다."
                  href="/privacy"
                />
                <ConsentCheckbox
                  checked={marketingAgreed}
                  onChange={setMarketingAgreed}
                  label="이벤트·프로모션 정보 수신에 동의합니다."
                />
              </div>
              {error && (
                <p className="text-[13px] text-red-600 -mb-1">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '전송 중...' : '알림 신청하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Modals() {
  const { modal, close } = useModal()

  if (!modal) return null

  return (
    <>
      <Overlay onClose={close} />
      {modal === 'creator' && <CreatorModal onClose={close} />}
      {modal === 'buyer' && <BuyerModal onClose={close} />}
    </>
  )
}
