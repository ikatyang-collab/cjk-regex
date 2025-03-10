import { test, expect } from 'vitest'
import type { Charset, CharsetDataUnit } from 'regexp-util'

const stringifyCodePoint = (codePoint: number) => {
  const character = String.fromCodePoint(codePoint)
  const codePointInHexadecimal = `U+${codePoint.toString(16).toUpperCase()}`
  return `${codePoint} (${character}, ${codePointInHexadecimal})`
}

const stringifyRange = (range: CharsetDataUnit) =>
  range[0] === range[1]
    ? stringifyCodePoint(range[0])
    : range.map(codePoint => stringifyCodePoint(codePoint)).join(' - ')

const stringifyCharset = (charset: Charset) => {
  return charset.data.map(range => stringifyRange(range)).join('\n')
}

const snapshotCharset = (name: string, charset: Charset) => {
  test(`Snapshot: ${name}`, () => {
    expect(`\n${stringifyCharset(charset)}\n`).toMatchSnapshot()
  })
}

export { snapshotCharset }
