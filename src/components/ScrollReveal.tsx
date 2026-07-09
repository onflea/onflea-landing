'use client'

import { useEffect } from 'react'

/**
 * [data-reveal] 요소를 관찰해 뷰포트에 들어오면 등장 애니메이션을 적용합니다.
 * JS가 실행된 후에만(html.reveal-ready) 요소를 숨기므로, JS 미작동 환경에서도 콘텐츠가 보입니다.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // class 대신 attribute 사용 — React가 className을 재할당해도 등장 상태가 유지됨
            entry.target.setAttribute('data-revealed', '')
            observer.unobserve(entry.target)
          }
        }
      },
      // 요소 상단이 뷰포트 하단에서 10% 지점을 지나면 등장
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
