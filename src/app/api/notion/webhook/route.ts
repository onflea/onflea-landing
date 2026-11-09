import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NEWS_CACHE_TAG } from '@/lib/notion'

function isValidSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false
  const expected = Buffer.from(`sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`)
  const received = Buffer.from(signature)
  return received.length === expected.length && timingSafeEqual(received, expected)
}

function parseJson(rawBody: string): Record<string, unknown> | null {
  try {
    const body: unknown = JSON.parse(rawBody)
    return typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

/** 노션에서 글을 발행·수정·삭제하면 소식 캐시를 비운다 */
export async function POST(request: Request) {
  const rawBody = await request.text()
  const secret = process.env.NOTION_WEBHOOK_SECRET

  // 구독을 만들 때 노션이 보내는 검증 토큰은 Vercel 로그로 확인해 NOTION_WEBHOOK_SECRET에 등록한다.
  // 시크릿 등록 전에만 출력하므로, 구독을 다시 만들 때는 환경변수를 먼저 지우고 재배포한다.
  if (!secret) {
    const token = parseJson(rawBody)?.verification_token
    if (typeof token !== 'string') return new Response(null, { status: 401 })
    console.log(`[notion-webhook] verification_token: ${JSON.stringify(token)}`)
    return new Response(null, { status: 200 })
  }

  if (!isValidSignature(rawBody, request.headers.get('x-notion-signature'), secret)) {
    return new Response(null, { status: 401 })
  }

  const event = parseJson(rawBody)
  if (!event) return new Response(null, { status: 400 })

  // 조회수 기록(/api/news/view)도 노션을 수정하므로, 봇이 낸 변경으로 캐시를 비우면 방문마다 캐시가 사라진다
  const authors = Array.isArray(event.authors) ? (event.authors as { type?: string }[]) : []
  const onlyBots = authors.length > 0 && authors.every((author) => author.type === 'bot')
  if (!onlyBots) revalidateTag(NEWS_CACHE_TAG)

  return new Response(null, { status: 200 })
}
