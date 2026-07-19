import { incrementNewsViews } from '@/lib/notion'

export async function POST(request: Request) {
  try {
    const { slug } = (await request.json()) as { slug?: unknown }
    if (typeof slug === 'string') await incrementNewsViews(slug)
  } catch {
    // 잘못된 요청도 조용히 무시 (fire-and-forget 집계)
  }
  return new Response(null, { status: 204 })
}
