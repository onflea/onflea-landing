import { getNewsImageSource, notionFileKey } from '@/lib/notion'

/*
 * 노션 이미지를 만료 없는 주소로 내려주는 경로 (/api/news/image/cover|block/<노션 ID>?v=<파일 ID>)
 * 요청 시점에 노션에서 새 임시 주소를 받아 이미지를 전달한다. 응답은 CDN에 캐시된다.
 */
export const dynamic = 'force-dynamic'

// Vercel 함수 응답 한도(4.5MB)보다 작은 파일만 직접 전달하고, 더 크면 노션 임시 주소로 넘긴다
const MAX_PROXY_BYTES = 4 * 1024 * 1024
const NO_STORE = { 'Cache-Control': 'no-store' }

export async function GET(request: Request, { params }: { params: { kind: string; id: string } }) {
  const { kind, id } = params
  if (kind !== 'cover' && kind !== 'block') return new Response(null, { status: 404, headers: NO_STORE })

  const src = await getNewsImageSource(kind, id)
  if (!src) return new Response(null, { status: 404, headers: NO_STORE })

  const download = new AbortController()
  const upstream = await fetch(src, { cache: 'no-store', signal: download.signal }).catch(() => null)
  if (!upstream?.ok || !upstream.body) return new Response(null, { status: 502, headers: NO_STORE })

  const size = Number(upstream.headers.get('content-length'))
  if (!size || size > MAX_PROXY_BYTES) {
    // 본문을 받지 않고 바로 끊는다 (body.cancel()을 기다리면 큰 파일에서 응답이 멈춤)
    download.abort()
    // 임시 주소는 10분 이상 남은 것만 받으므로 리다이렉트는 5분까지 캐시해도 안전
    return new Response(null, {
      status: 307,
      headers: { Location: src, 'Cache-Control': 'public, max-age=0, s-maxage=300' },
    })
  }

  // 주소의 v가 지금 파일과 같으면 같은 주소로 다른 이미지가 나갈 일이 없으므로 길게 캐시.
  // 파일을 바꾸면 페이지에 새 v가 들어가 새 주소가 된다
  const version = new URL(request.url).searchParams.get('v')
  const cacheControl =
    version && version === notionFileKey(src)
      ? 'public, max-age=31536000, s-maxage=31536000, immutable'
      : 'public, max-age=0, s-maxage=600'

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'application/octet-stream',
      'Content-Length': String(size),
      'Cache-Control': cacheControl,
    },
  })
}
