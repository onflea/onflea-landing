import type { NotionBlock, NotionRichText } from '@/lib/notion'

/* 노션 본문 블록 렌더러 — 문단·헤딩·리스트·이미지·인용·구분선·콜아웃 지원, 그 외 블록은 무시 */

function RichText({ rich }: { rich: NotionRichText[] }) {
  return (
    <>
      {rich.map((t, i) => {
        let node: React.ReactNode = t.plain_text
        if (t.annotations.code)
          node = <code className="bg-[#f5f5f5] px-1.5 py-0.5 text-[0.9em]">{node}</code>
        if (t.annotations.bold) node = <strong className="font-bold text-[#0c0c0c]">{node}</strong>
        if (t.annotations.italic) node = <em>{node}</em>
        if (t.annotations.strikethrough) node = <s>{node}</s>
        if (t.annotations.underline) node = <u className="underline underline-offset-2">{node}</u>
        if (t.href)
          node = (
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-[#0c0c0c] hover:opacity-60 transition-opacity"
            >
              {node}
            </a>
          )
        return <span key={i}>{node}</span>
      })}
    </>
  )
}

function blockRichText(block: NotionBlock): NotionRichText[] {
  const data = block[block.type] as { rich_text?: NotionRichText[] } | undefined
  return data?.rich_text ?? []
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case 'paragraph': {
      const rich = blockRichText(block)
      if (rich.length === 0) return <div className="h-4" />
      return (
        <p className="text-[15px] text-[rgba(12,12,12,0.7)] leading-[1.9] mb-5">
          <RichText rich={rich} />
        </p>
      )
    }
    case 'heading_1':
      return (
        <h2 className="text-2xl md:text-3xl font-black text-[#0c0c0c] mt-12 mb-5">
          <RichText rich={blockRichText(block)} />
        </h2>
      )
    case 'heading_2':
      return (
        <h3 className="text-xl md:text-2xl font-black text-[#0c0c0c] mt-10 mb-4">
          <RichText rich={blockRichText(block)} />
        </h3>
      )
    case 'heading_3':
      return (
        <h4 className="text-lg font-black text-[#0c0c0c] mt-8 mb-3">
          <RichText rich={blockRichText(block)} />
        </h4>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#0c0c0c] pl-6 py-1 my-8">
          <p className="text-base font-bold text-[#0c0c0c] leading-relaxed">
            <RichText rich={blockRichText(block)} />
          </p>
        </blockquote>
      )
    case 'callout': {
      return (
        <div className="bg-[#f5f5f5] px-6 py-5 my-8">
          <p className="text-[15px] text-[rgba(12,12,12,0.7)] leading-relaxed">
            <RichText rich={blockRichText(block)} />
          </p>
        </div>
      )
    }
    case 'divider':
      return <hr className="border-[rgba(12,12,12,0.08)] my-10" />
    case 'image': {
      const data = block.image as {
        type: 'file' | 'external'
        file?: { url: string }
        external?: { url: string }
        caption?: NotionRichText[]
      }
      const src = data.type === 'file' ? data.file?.url : data.external?.url
      if (!src) return null
      const caption = data.caption?.map((c) => c.plain_text).join('') ?? ''
      return (
        <figure className="my-10">
          {/* 노션 이미지 URL은 만료 기한이 있어 next/image 최적화 대신 원본 사용 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption} className="w-full h-auto" />
          {caption && (
            <figcaption className="mt-3 text-[13px] text-[rgba(12,12,12,0.4)] text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
    default:
      return null
  }
}

function ListItem({ block }: { block: NotionBlock }) {
  return (
    <li className="text-[15px] text-[rgba(12,12,12,0.7)] leading-[1.9]">
      <RichText rich={blockRichText(block)} />
      {block.children && block.children.length > 0 && (
        <NotionBlocks blocks={block.children} nested />
      )}
    </li>
  )
}

export default function NotionBlocks({
  blocks,
  nested = false,
}: {
  blocks: NotionBlock[]
  nested?: boolean
}) {
  // 연속된 리스트 항목을 ul/ol로 묶기
  type Group =
    | { kind: 'list'; listType: string; items: NotionBlock[] }
    | { kind: 'block'; block: NotionBlock }
  const groups: Group[] = []
  for (const block of blocks) {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const last = groups[groups.length - 1]
      if (last && last.kind === 'list' && last.listType === block.type) {
        last.items.push(block)
      } else {
        groups.push({ kind: 'list', listType: block.type, items: [block] })
      }
    } else {
      groups.push({ kind: 'block', block })
    }
  }

  return (
    <div className={nested ? 'mt-1' : ''}>
      {groups.map((g, i) => {
        if (g.kind === 'list') {
          const List = g.listType === 'numbered_list_item' ? 'ol' : 'ul'
          return (
            <List
              key={i}
              className={`${
                g.listType === 'numbered_list_item' ? 'list-decimal' : 'list-disc'
              } pl-6 mb-5 space-y-1.5 marker:text-[rgba(12,12,12,0.35)]`}
            >
              {g.items.map((item) => (
                <ListItem key={item.id} block={item} />
              ))}
            </List>
          )
        }
        return <Block key={g.block.id} block={g.block} />
      })}
    </div>
  )
}
