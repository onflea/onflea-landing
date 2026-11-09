import type { NotionBlock, NotionRichText } from '@/lib/notion'

/* 노션 본문 블록 렌더러 — 문단·헤딩·리스트·체크리스트·표·이미지·인용·콜아웃·코드·구분선 지원, 그 외 블록은 무시 */

// 본문 글자 크기·색 (문단, 목록, 콜아웃, 체크리스트 공용)
const BODY_SIZE = 'text-[17px] md:text-[18px]'
const BODY_COLOR = 'text-[#262626]'

// 노션 라이트 모드 팔레트
const TEXT_COLORS: Record<string, string> = {
  gray: '#787774',
  brown: '#9F6B53',
  orange: '#D9730D',
  yellow: '#CB912F',
  green: '#448361',
  blue: '#337EA9',
  purple: '#9065B0',
  pink: '#C14C8A',
  red: '#D44C47',
}

const BG_COLORS: Record<string, string> = {
  gray_background: '#F1F1EF',
  brown_background: '#F4EEEE',
  orange_background: '#FAEBDD',
  yellow_background: '#FBF3DB',
  green_background: '#EDF3EC',
  blue_background: '#E7F3F8',
  purple_background: '#F8F3FC',
  pink_background: '#FAF1F5',
  red_background: '#FDEBEC',
}

function colorStyle(color?: string): React.CSSProperties {
  if (!color || color === 'default') return {}
  if (color.endsWith('_background')) {
    const bg = BG_COLORS[color]
    return bg ? { backgroundColor: bg } : {}
  }
  const text = TEXT_COLORS[color]
  return text ? { color: text } : {}
}

function RichText({ rich }: { rich: NotionRichText[] }) {
  return (
    <>
      {rich.map((t, i) => {
        const hasTextColor =
          t.annotations.color !== 'default' && !t.annotations.color?.endsWith('_background')
        let node: React.ReactNode = t.plain_text
        if (t.annotations.code)
          node = <code className="bg-[#f5f5f5] px-1.5 py-0.5 text-[0.9em]">{node}</code>
        if (t.annotations.bold)
          // 색상 지정 시 볼드의 기본 검정색이 색을 덮지 않도록
          node = <strong className={hasTextColor ? 'font-bold' : 'font-bold text-[#0c0c0c]'}>{node}</strong>
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
        const style = colorStyle(t.annotations.color)
        const isHighlight = t.annotations.color?.endsWith('_background')
        return (
          <span key={i} style={style} className={isHighlight ? 'px-0.5' : undefined}>
            {node}
          </span>
        )
      })}
    </>
  )
}

function blockRichText(block: NotionBlock): NotionRichText[] {
  const data = block[block.type] as { rich_text?: NotionRichText[] } | undefined
  return data?.rich_text ?? []
}

function blockColor(block: NotionBlock): string | undefined {
  const data = block[block.type] as { color?: string } | undefined
  return data?.color
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case 'paragraph': {
      const rich = blockRichText(block)
      if (rich.length === 0) return <div className="h-4" />
      const color = blockColor(block)
      const isBg = color?.endsWith('_background')
      return (
        <p
          style={colorStyle(color)}
          className={`${BODY_SIZE} ${BODY_COLOR} leading-[1.85] mb-6 ${isBg ? 'px-4 py-3' : ''}`}
        >
          <RichText rich={rich} />
        </p>
      )
    }
    case 'heading_1':
      return (
        <h2 style={colorStyle(blockColor(block))} className="text-2xl md:text-3xl font-black text-[#0c0c0c] mt-12 mb-5">
          <RichText rich={blockRichText(block)} />
        </h2>
      )
    case 'heading_2':
      return (
        <h3 style={colorStyle(blockColor(block))} className="text-xl md:text-2xl font-black text-[#0c0c0c] mt-10 mb-4">
          <RichText rich={blockRichText(block)} />
        </h3>
      )
    case 'heading_3':
      return (
        <h4 style={colorStyle(blockColor(block))} className="text-lg md:text-xl font-black text-[#0c0c0c] mt-8 mb-3">
          <RichText rich={blockRichText(block)} />
        </h4>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#0c0c0c] pl-6 py-1 my-8">
          <p className="text-[18px] md:text-[20px] font-bold text-[#0c0c0c] leading-[1.7]">
            <RichText rich={blockRichText(block)} />
          </p>
        </blockquote>
      )
    case 'callout': {
      const color = blockColor(block)
      const bg = color && color.endsWith('_background') ? BG_COLORS[color] : undefined
      return (
        <div style={bg ? { backgroundColor: bg } : undefined} className={`px-6 py-5 my-8 ${bg ? '' : 'bg-[#f5f5f5]'}`}>
          <p className={`${BODY_SIZE} ${BODY_COLOR} leading-[1.75]`}>
            <RichText rich={blockRichText(block)} />
          </p>
        </div>
      )
    }
    case 'to_do': {
      const data = block.to_do as { rich_text?: NotionRichText[]; checked?: boolean }
      const checked = data.checked ?? false
      return (
        <div className="flex items-start gap-3 mb-2.5">
          <span
            className={`mt-[7px] size-4 border shrink-0 flex items-center justify-center ${
              checked ? 'bg-[#0c0c0c] border-[#0c0c0c]' : 'border-[rgba(12,12,12,0.3)]'
            }`}
          >
            {checked && <span className="text-white text-[10px] leading-none font-bold">✓</span>}
          </span>
          <p
            className={`${BODY_SIZE} leading-[1.75] ${
              checked
                ? 'text-[rgba(12,12,12,0.55)] line-through decoration-[rgba(12,12,12,0.35)]'
                : BODY_COLOR
            }`}
          >
            <RichText rich={data.rich_text ?? []} />
          </p>
        </div>
      )
    }
    case 'code': {
      const data = block.code as { rich_text?: NotionRichText[] }
      const text = (data.rich_text ?? []).map((t) => t.plain_text).join('')
      return (
        <pre className="bg-[#0c0c0c] text-[#f5f5f5] text-[14px] md:text-[15px] leading-relaxed p-5 my-8 overflow-x-auto">
          <code>{text}</code>
        </pre>
      )
    }
    case 'table': {
      const meta = block.table as { has_column_header?: boolean; has_row_header?: boolean }
      const rows = (block.children ?? []).filter((r) => r.type === 'table_row')
      if (rows.length === 0) return null
      return (
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-[15px] md:text-[16px]">
            <tbody>
              {rows.map((row, ri) => {
                const cells = (row.table_row as { cells: NotionRichText[][] }).cells
                const headerRow = !!meta.has_column_header && ri === 0
                return (
                  <tr key={row.id}>
                    {cells.map((cell, ci) => {
                      const headerCell = headerRow || (!!meta.has_row_header && ci === 0)
                      const Cell = headerCell ? 'th' : 'td'
                      return (
                        <Cell
                          key={ci}
                          className={`border border-[rgba(12,12,12,0.12)] px-4 py-2.5 text-left align-top leading-relaxed ${
                            headerCell
                              ? 'bg-[#f5f5f5] font-bold text-[#0c0c0c]'
                              : BODY_COLOR
                          }`}
                        >
                          <RichText rich={cell} />
                        </Cell>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
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
            <figcaption className="mt-3 text-[14px] text-[rgba(12,12,12,0.6)] text-center">
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
    <li className={`${BODY_SIZE} ${BODY_COLOR} leading-[1.85]`}>
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
    // 한글 단어가 줄 끝에서 잘리지 않게 어절 단위로 줄바꿈 (긴 URL은 넘치지 않게 끊음)
    <div className={nested ? 'mt-1' : 'break-keep break-words'}>
      {groups.map((g, i) => {
        if (g.kind === 'list') {
          const List = g.listType === 'numbered_list_item' ? 'ol' : 'ul'
          return (
            <List
              key={i}
              className={`${
                g.listType === 'numbered_list_item' ? 'list-decimal' : 'list-disc'
              } pl-6 mb-6 space-y-2 marker:text-[rgba(12,12,12,0.6)]`}
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
