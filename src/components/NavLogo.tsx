import type { CSSProperties } from 'react'

/*
 * 텍스트 로고(ONFLEA) → 심볼(OF) 모핑 로고
 * 좌표 단위는 logo-text PNG(807x128) 픽셀. 심볼 PNG(260x190) 좌표는 SYM 배율로 변환해 사용
 * 텍스트 20px, 심볼 28px 높이로 보이도록 viewBox 높이를 잡고 텍스트는 세로 가운데 배치
 */
const VIEW_W = 807
const VIEW_H = 179.2 // 128 * 28 / 20
const TEXT_Y = (VIEW_H - 128) / 2
const SYM = VIEW_H / 190

// 화면상 크기(px): 로고 전체 폭과 심볼만 남았을 때의 폭 (클릭 영역 계산용)
export const LOGO_WIDTH = 126
export const SYMBOL_WIDTH = Math.ceil((260 * SYM * LOGO_WIDTH) / VIEW_W)

// 헤더 배경 전환과 로고 모핑이 같은 시간에 끝나도록 공유하는 전체 길이
export const NAV_TRANSITION_MS = 600
// 전체 길이에 대한 비율 → ms (타임라인을 NAV_TRANSITION_MS 하나로 조절)
const at = (ratio: number) => Math.round(NAV_TRANSITION_MS * ratio)

const EASE_MOVE = 'cubic-bezier(0.65, 0, 0.35, 1)'
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

// 1x1 사각형/단위 원을 translate + scale로 늘려 그리면 두 상태 사이를 transform 전환만으로 보간할 수 있음
const box = (x: number, y: number, w: number, h: number) =>
  `translate(${x}px, ${y}px) scale(${w}, ${h})`
const textBox = (x: number, y: number, w: number, h: number) => box(x, y + TEXT_Y, w, h)
const symBox = (x: number, y: number, w: number, h: number) => box(x * SYM, y * SYM, w * SYM, h * SYM)

// O: 텍스트 타원 → 심볼 원. strokeWidth는 단위 원 기준(두께 / 반지름)
const O_TEXT = { transform: textBox(63.5, 64, 58.25, 56), strokeWidth: 0.18 }
const O_SYMBOL = { transform: symBox(90, 95, 85.5, 90.75), strokeWidth: 0.0993 }

// F: 세로획, 윗가로획, 가운데 가로획
const F_BARS = [
  { text: textBox(339, 5, 10, 118), symbol: symBox(146.5, 2, 9, 186) },
  { text: textBox(339, 5, 68, 8), symbol: symBox(146.5, 2, 113.5, 8) },
  { text: textBox(339, 55, 67, 9), symbol: symBox(146.5, 91, 100.5, 8) },
]

// 심볼에서 사라지는 글자 (N, L, E, A)
const FADING_LETTERS = [
  'M181 123V0.8L270 104.7V5h9v121h-1.9L190 24.3V123Z',
  'M468 5h10v110h53v8h-63z',
  'M580 5h68v8h-58v41h55v9h-55v52h58v8h-68z',
  'M694.6 123L751 -0.7L807 123H795.4L751 20.9L705.6 123Z',
]

// O·F 이동: 접을 때는 글자가 빠지기 시작한 뒤 출발, 펼칠 때는 바로 출발
const morphStyle = (transform: string, compact: boolean): CSSProperties => {
  const timing = `${at(0.7)}ms ${EASE_MOVE} ${at(compact ? 0.15 : 0.05)}ms`
  return {
    transform,
    transformBox: 'view-box',
    transformOrigin: '0 0',
    transition: `transform ${timing}, stroke-width ${timing}`,
  }
}

export default function NavLogo({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width={LOGO_WIDTH}
      height={28}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
      className={`block pointer-events-none transition-colors ${dark ? 'text-[#0c0c0c]' : 'text-white'}`}
      style={{ transitionDuration: `${NAV_TRANSITION_MS}ms` }}
    >
      <g transform={`translate(0 ${TEXT_Y})`} fill="currentColor">
        {FADING_LETTERS.map((d, i) => {
          // 접을 때는 N 먼저 빠르게 사라지고, 펼칠 때는 O·F가 벌어진 뒤 N부터 차례로 등장
          const delay = at(compact ? i * 0.05 : 0.45 + i * 0.05)
          const fade = at(compact ? (i === 0 ? 0.3 : 0.35) : 0.4)
          const slide = at(compact ? 0.6 : 0.4)
          return (
            <path
              key={d}
              d={d}
              style={{
                opacity: compact ? 0 : 1,
                transform: compact && i > 0 ? 'translateX(-60px)' : 'translateX(0)',
                transition: `opacity ${fade}ms ${EASE_OUT} ${delay}ms, transform ${slide}ms ${EASE_OUT} ${delay}ms`,
              }}
            />
          )
        })}
      </g>

      {F_BARS.map((bar, i) => (
        <rect
          key={i}
          width={1}
          height={1}
          fill="currentColor"
          style={morphStyle(compact ? bar.symbol : bar.text, compact)}
        />
      ))}

      {/* 심볼에서 F가 원과 겹치는 곳의 틈 — 스크롤 상태 헤더 배경(흰색)으로 덮어서 표현 */}
      <g
        transform={`scale(${SYM})`}
        fill="none"
        stroke="#fff"
        strokeWidth={6}
        style={{
          opacity: compact ? 1 : 0,
          // 배경이 거의 흰색이 된 마지막 구간에 등장, 펼칠 때는 배경이 비치기 전에 바로 제거
          transition: compact ? `opacity ${at(0.2)}ms ease-out ${at(0.8)}ms` : `opacity ${at(0.15)}ms ease-out`,
        }}
      >
        <ellipse cx={90} cy={95} rx={93} ry={98} />
        <ellipse cx={90} cy={95} rx={78} ry={84} clipPath="url(#nav-logo-inner-gap)" />
        <clipPath id="nav-logo-inner-gap">
          <rect x={140} y={0} width={25} height={60} />
        </clipPath>
      </g>

      <ellipse
        cx={0}
        cy={0}
        rx={1}
        ry={1}
        fill="none"
        stroke="currentColor"
        style={{ ...morphStyle((compact ? O_SYMBOL : O_TEXT).transform, compact), strokeWidth: (compact ? O_SYMBOL : O_TEXT).strokeWidth }}
      />
    </svg>
  )
}
