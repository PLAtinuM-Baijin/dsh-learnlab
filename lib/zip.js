import { inflateRawSync } from 'node:zlib'

const EOCD_SIG = 0x06054b50
const CEN_SIG = 0x02014b50
const LOC_SIG = 0x04034b50

/**
 * 读一个 ZIP 容器（.pptx 本质就是 ZIP）。
 * 只支持普通（非 ZIP64）条目，对课件文件足够。
 */
export function openZip(buf) {
  let eocd = -1
  const floor = Math.max(0, buf.length - 65558)
  for (let i = buf.length - 22; i >= floor; i -= 1) {
    if (buf.readUInt32LE(i) === EOCD_SIG) {
      eocd = i
      break
    }
  }
  if (eocd < 0) throw new Error('不是有效的 zip 容器')

  const count = buf.readUInt16LE(eocd + 10)
  let ptr = buf.readUInt32LE(eocd + 16)
  const entries = new Map()

  for (let i = 0; i < count; i += 1) {
    if (ptr + 46 > buf.length || buf.readUInt32LE(ptr) !== CEN_SIG) break
    const method = buf.readUInt16LE(ptr + 10)
    const compressedSize = buf.readUInt32LE(ptr + 20)
    const nameLen = buf.readUInt16LE(ptr + 28)
    const extraLen = buf.readUInt16LE(ptr + 30)
    const commentLen = buf.readUInt16LE(ptr + 32)
    const localOffset = buf.readUInt32LE(ptr + 42)
    const name = buf.toString('utf8', ptr + 46, ptr + 46 + nameLen)
    entries.set(name, { method, compressedSize, localOffset })
    ptr += 46 + nameLen + extraLen + commentLen
  }

  function read(name) {
    const entry = entries.get(name)
    if (!entry) return undefined
    const at = entry.localOffset
    if (buf.readUInt32LE(at) !== LOC_SIG) throw new Error(`损坏的 zip 条目：${name}`)
    const nameLen = buf.readUInt16LE(at + 26)
    const extraLen = buf.readUInt16LE(at + 28)
    const start = at + 30 + nameLen + extraLen
    const raw = buf.subarray(start, start + entry.compressedSize)
    if (entry.method === 0) return Buffer.from(raw)
    if (entry.method === 8) return inflateRawSync(raw)
    throw new Error(`不支持的压缩方式 ${entry.method}：${name}`)
  }

  return { names: () => [...entries.keys()], has: (n) => entries.has(n), read }
}
