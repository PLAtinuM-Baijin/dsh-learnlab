import React from 'react'
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  Eraser,
  Image as ImageIcon,
  Languages,
  LayoutGrid,
  MessageSquareText,
  Minus,
  Pen,
  PenLine,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Square,
  StickyNote,
  Trash2,
  Undo2,
  X,
} from 'lucide-react'

const MAP = {
  back: ArrowLeft,
  send: ArrowUp,
  book: BookOpen,
  camera: Camera,
  down: ChevronDown,
  prev: ChevronLeft,
  next: ChevronRight,
  copy: Copy,
  eraser: Eraser,
  translate: Languages,
  grid: LayoutGrid,
  chat: MessageSquareText,
  pen: Pen,
  draw: PenLine,
  image: ImageIcon,
  compare: Columns2,
  edit: Pencil,
  plus: Plus,
  regen: RotateCcw,
  search: Search,
  settings: Settings,
  summary: Sparkles,
  stop: Square,
  note: StickyNote,
  clear: Trash2,
  undo: Undo2,
  minus: Minus,
  close: X,
}

/** 统一图标的尺寸与描边，全站共用一套。 */
const Icon = React.memo(function Icon({ name, size = 16, strokeWidth = 1.75, style }) {
  const Glyph = MAP[name]
  if (!Glyph) return null
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      style={{ display: 'block', flex: 'none', ...style }}
    />
  )
})

export default Icon
export { MAP as iconMap }
