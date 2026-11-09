import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LegalHeader from '@/components/LegalHeader'
import Footer from '@/components/Footer'
import NotionBlocks from '@/components/NotionBlocks'
import NewsRow from '@/components/NewsRow'
import ViewTracker from '@/components/ViewTracker'
import { getNews, getNewsPost, getNewsBlocks, formatNewsDate } from '@/lib/notion'
import { NEWS_PUBLISHER } from '@/lib/constants'

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
    authors: [{ name: NEWS_PUBLISHER }],
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: `ONFLEA ${post.category} 소식`,
      type: 'article',
      authors: [NEWS_PUBLISHER],
    },
  }
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = await getNewsPost(params.slug)
  if (!post) notFound()

  const [blocks, allNews] = await Promise.all([getNewsBlocks(params.slug), getNews()])
  const otherNews = allNews.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <>
      <LegalHeader />
      <ViewTracker slug={post.slug} />
      <main className="bg-white min-h-screen">
        <article className="max-w-[768px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">
          {/* 헤더 */}
          <p className="text-[12px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.55)] mb-6">
            News
          </p>
          <h1 className="text-3xl md:text-[44px] font-black leading-[1.3] text-[#0c0c0c] mb-6 break-keep">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 pb-10 mb-12 border-b border-[rgba(12,12,12,0.08)]">
            <span className="border border-[rgba(12,12,12,0.18)] px-2.5 py-1 text-[12px] font-bold tracking-[1.5px] text-[rgba(12,12,12,0.7)]">
              {post.category}
            </span>
            <span className="text-[14px] text-[rgba(12,12,12,0.6)] tabular-nums">
              {formatNewsDate(post.date)}
            </span>
            <span className="text-[14px] text-[rgba(12,12,12,0.6)]">{NEWS_PUBLISHER}</span>
          </div>

          {/* 본문 */}
          {blocks.length > 0 ? (
            <NotionBlocks blocks={blocks} />
          ) : (
            <p className="text-[17px] text-[rgba(12,12,12,0.6)]">본문이 없습니다.</p>
          )}

          {/* 하단 내비게이션 */}
          <div className="mt-16">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[2.16px] uppercase text-[#0c0c0c] border border-[rgba(12,12,12,0.3)] px-6 py-3.5 hover:bg-[#0c0c0c] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              전체 소식 보기
            </Link>
          </div>
        </article>

        {/* 다른 소식 */}
        {otherNews.length > 0 && (
          <div className="border-t border-[rgba(12,12,12,0.08)] bg-[#f5f5f5]">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
              <p className="text-[12px] font-bold tracking-[3px] uppercase text-[rgba(12,12,12,0.55)] mb-8">
                More News
              </p>
              {otherNews.map((item, i) => (
                <NewsRow key={item.id} item={item} first={i === 0} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
