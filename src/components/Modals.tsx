'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-md"
      onClick={onClose}
    />
  )
}

function CreatorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', channelUrl: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[ON-FLEA 입점 문의] ${form.name}`)
    const body = encodeURIComponent(
      `이름: ${form.name}\n이메일: ${form.email}\n채널 링크: ${form.channelUrl}`
    )
    window.location.href = `mailto:hello@onflea.co.kr?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-[520px] relative rounded-lg shadow-2xl">
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
          <p className="text-[rgba(12,12,12,0.5)] text-sm mb-8">정보를 남겨주시면 ON-FLEA 팀이 직접 연락드립니다.</p>

          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-12 h-12 bg-[#ff4d6d] rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <p className="text-[#0c0c0c] font-bold text-lg">이메일이 열렸습니다.</p>
              <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed">
                이메일 앱에서 내용을 확인하고 전송해 주세요.<br />
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full bg-[#ff4d6d] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#e8365a] transition-colors"
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
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 rounded-md placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#ff4d6d] transition-colors"
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
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 rounded-md placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#ff4d6d] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0c0c0c] text-sm font-medium">채널 링크</label>
                <input
                  value={form.channelUrl}
                  onChange={e => setForm(f => ({ ...f, channelUrl: e.target.value }))}
                  placeholder="유튜브, 인스타그램 등 채널 URL"
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 rounded-md placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#ff4d6d] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="mt-1 w-full bg-[#ff4d6d] text-[#0c0c0c] text-sm font-semibold py-4 rounded-md hover:bg-[#e8365a] transition-colors"
              >
                문의 보내기
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-[520px] relative rounded-lg shadow-2xl">
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

          {submitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-12 h-12 bg-[#0c0c0c] rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <p className="text-[#0c0c0c] font-bold text-lg">신청 완료!</p>
              <p className="text-[rgba(12,12,12,0.55)] text-sm leading-relaxed">
                오픈 시 가장 먼저 알려드리겠습니다.<br />
                관심 가져주셔서 감사합니다.
              </p>
              <button
                onClick={onClose}
                className="mt-2 w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#333] transition-colors"
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
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 rounded-md placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
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
                  className="bg-[#f5f5f5] border border-transparent text-[#0c0c0c] text-sm px-4 py-3.5 rounded-md placeholder-[rgba(12,12,12,0.3)] focus:outline-none focus:border-[#0c0c0c] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="mt-1 w-full bg-[#0c0c0c] text-white text-sm font-semibold py-4 rounded-md hover:bg-[#333] transition-colors"
              >
                알림 신청하기
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
