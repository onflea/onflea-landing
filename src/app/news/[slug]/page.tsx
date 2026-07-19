import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'
import NotionBlocks from '@/components/NotionBlocks'
import { getNews, getNewsPost, getNewsBlocks, formatNewsDate } from '@/lib/notion'

export const revalidate = 600

export async function generateStaticParams() {
  const news = await getNews()
  return news.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug)
  if (!post) return { title: '소식 | ONFLEA(온플리)' }
  return {
    title: `${post.title} | ONFLEA(온플리)`,
    description: `ONFLEA ${post.category} 소식 — ${post.title}`,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: `ONFLEA ${post.category} 소식`,
      type: 'article',
    },
  }
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug)
  if (!post) notFound()

  const blocks = await getNewsBlocks(params.slug)

  return (
    <>
      <LegalHeader />
      <main className="bg-white min-h-screen">
        <article className="max-w-[768px] mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* 헤더 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="border border-[rgba(12,12,12,0.18)] px-3 py-1.5 text-[10px] font-bold tracking-[1.5px] text-[rgba(12,12,12,0.55)]">
              {post.category}
            </span>
            <span className="text-sm text-[rgba(12,12,12,0.4)] tabular-nums">
              {formatNewsDate(post.date)}
            </span>
          </div>
          <h1 className="text-3xl md:text-[44px] font-black leading-[1.3] text-[#0c0c0c] mb-12 pb-10 border-b border-[rgba(12,12,12,0.08)]">
            {post.title}
          </h1>

          {/* 본문 */}
          {blocks.length > 0 ? (
            <NotionBlocks blocks={blocks} />
          ) : (
            <p className="text-[15px] text-[rgba(12,12,12,0.45)]">본문이 없습니다.</p>
          )}

          {/* 하단 내비게이션 */}
          <div className="mt-16 pt-8 border-t border-[rgba(12,12,12,0.08)]">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[2.16px] uppercase text-[#0c0c0c] border border-[rgba(12,12,12,0.3)] px-6 py-3.5 hover:bg-[#0c0c0c] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              전체 소식 보기
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
