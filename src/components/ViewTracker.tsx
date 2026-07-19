'use client'

import { useEffect } from 'react'

/** 상세 페이지 조회수 집계 (화면에는 아무것도 렌더링하지 않음) */
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `onflea_news_viewed_${slug}`
    try {
      // 같은 브라우저 세션에서 재방문 시 중복 집계 방지
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // sessionStorage 사용 불가 환경이면 그냥 집계
    }

    const body = JSON.stringify({ slug })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/news/view', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/news/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  }, [slug])

  return null
}
