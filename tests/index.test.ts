import * as cjk from '../src/index.js'
import { test, expect } from 'vitest'

type TestType = 'non-cjk' | 'cjk-letter' | 'cjk-punctuation'
type TestCases = { [char: string]: TestType }

// BMP
const cjkRadicalsSupplement = '⻁⺪⻏'
const kangxiRadicals = '⽒⽓⽔⽕'
const ideographicDescriptionCharacters = '⿰⿱⿲⿳'
const cjkSymbolsPunctuation = '。「」〒〓〱'
const alsoCjkSymbolsPunctuation = '〻〧〨〤々'
const hiragana = 'あどなにぬ'
const katakana = 'ハヒヘホ'
const katakanaPunctuation = '゠・'
const bopomofo = 'ㄅㄬㄭㄮㄯ'
const hangulCompatibilityJamo = 'ㅂㅵㅶㅷㅸ'
const kanbun = '㆐㆑㆒㆓'
const bopomofoExtended = 'ㆠㆡㆾㆿ'
const cjkStrokes = '㇀㇁㇂㇃㇄㇅㇆㇇㇈㇉㇊㇢㇣'
const katakanaPhoneticExtensions = 'ㇼㇽㇾㇿ'
const enclosedCjkLettersMonths = '㈱㋋㋌㋿'
const cjkCompatibility = '㌕㍕㍖㍗'
const alsoCjkCompatibility = '㍧㍻㍿㏄㏾'
const cjkUnifiedIdeographsExtensionA = '䶼䶽䶾䶿'
const cjkUnifiedIdeographs = '中'
const hangulJamoExtendedA = 'ꥠꥹꥺꥻ'
const hangulSyllables = '가힠힡힢힣'
const hangulJamoExtendedB = 'ퟔퟸퟹퟺퟻ'
const cjkCompatibilityIdeographs = '豈兀﨔隷侮恵並﨎'
const cjkCompatibilityForms = '﹌﹍﹎﹏'
const smallFormVariants = '﹨﹩﹪﹫'
const halfwidthandFullwidthForms = '！Ｄ｢￥￮'
const alsoHalfwidthandFullwidthForms = 'ｦﾕￇ'

// SMP
const kanaExtendedB = '𚿵𚿶𚿷𚿸'
const kanaSupplement = '𛀂𛀀𛀁𛃾𛃿'
const kanaExtendedA = '𛄀𛄁𛄡𛄢'
const smallKanaExtension = '𛅕𛄲𛅤𛅥𛅦𛅧'
const nushu = '𛋸𛋹𛋺𛋻'
const khitanSmallScript = '𘳒𘳓𘳔𘳕'
const cjkUnifiedIdeographsExtensionB = '𪛜𪛝𪛞𪛟'
const cjkUnifiedIdeographsExtensionC = '𫚄𫚅𫜸𫜹'
const cjkUnifiedIdeographsExtensionD = '𫝀𫝁𫝂𫝃'
const cjkUnifiedIdeographsExtensionE = '𬉼𬷰𬷱𬺠𬺡'
const cjkUnifiedIdeographsExtensionF = '𬻿𮨥𮨦𮯠'
const cjkUnifiedIdeographsExtensionG = '𰀀𰀁𱍀𱍊'
const cjkUnifiedIdeographsExtensionH = '𱍐𱍑𲎬𲎭'
const cjkCompatibilityIdeographsSupplement = '乁你鼻𪘀'

const basicLatin = '.a'

function casify(chars: string, t: TestType): TestCases {
  return Object.fromEntries(chars.split(/(?:)/u).map(c => [c, t]))
}

const testCases: TestCases = {
  ...casify(cjkRadicalsSupplement, 'cjk-letter'),
  ...casify(cjkSymbolsPunctuation, 'cjk-punctuation'),
  ...casify(alsoCjkSymbolsPunctuation, 'cjk-letter'),
  ...casify(kangxiRadicals, 'cjk-letter'),
  ...casify(ideographicDescriptionCharacters, 'cjk-punctuation'),
  ...casify(hiragana + katakana, 'cjk-letter'),
  ...casify(katakanaPunctuation, 'cjk-punctuation'),
  ...casify(katakanaPhoneticExtensions, 'cjk-letter'),
  ...casify(enclosedCjkLettersMonths, 'cjk-punctuation'),
  ...casify(cjkStrokes, 'cjk-punctuation'),
  ...casify(bopomofo + bopomofoExtended, 'cjk-letter'),
  ...casify(
    hangulCompatibilityJamo + hangulJamoExtendedA + hangulJamoExtendedB,
    'cjk-letter',
  ),
  ...casify(hangulSyllables, 'cjk-letter'),
  ...casify(kanbun, 'cjk-punctuation'),
  ...casify(cjkCompatibility, 'cjk-letter'),
  ...casify(alsoCjkCompatibility, 'cjk-punctuation'),
  ...casify(
    cjkUnifiedIdeographsExtensionA + cjkUnifiedIdeographs,
    'cjk-letter',
  ),
  ...casify(cjkCompatibilityIdeographs, 'cjk-letter'),
  ...casify(
    cjkCompatibilityForms + smallFormVariants + halfwidthandFullwidthForms,
    'cjk-punctuation',
  ),
  ...casify(alsoHalfwidthandFullwidthForms, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionE, 'cjk-letter'),
  ...casify(nushu, 'non-cjk'),
  ...casify(khitanSmallScript, 'non-cjk'),
  ...casify(basicLatin, 'non-cjk'),
  ...casify(cjkUnifiedIdeographsExtensionB, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionC, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionD, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionE, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionF, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionG, 'cjk-letter'),
  ...casify(cjkUnifiedIdeographsExtensionH, 'cjk-letter'),
  ...casify(cjkCompatibilityIdeographsSupplement, 'cjk-letter'),
  ...casify(
    kanaExtendedA + kanaExtendedB + kanaSupplement + smallKanaExtension,
    'cjk-letter',
  ),
}

Object.keys(testCases).forEach(character => {
  const category = testCases[character]
  const title = `"${character}" (0x${character
    .codePointAt(0)!
    .toString(16)}) is ${category}`
  test(title, () => {
    switch (category) {
      case 'non-cjk':
        expect(character).not.toMatch(cjk.all().toRegExp('u'))
        expect(character).not.toMatch(cjk.letters().toRegExp('u'))
        expect(character).not.toMatch(cjk.punctuations().toRegExp('u'))
        break
      case 'cjk-letter':
        expect(character).toMatch(cjk.all().toRegExp('u'))
        expect(character).toMatch(cjk.letters().toRegExp('u'))
        expect(character).not.toMatch(cjk.punctuations().toRegExp('u'))
        break
      case 'cjk-punctuation':
        expect(character).toMatch(cjk.all().toRegExp('u'))
        expect(character).not.toMatch(cjk.letters().toRegExp('u'))
        expect(character).toMatch(cjk.punctuations().toRegExp('u'))
        break
      default:
        throw new Error(`Unexpected category "${category}"`)
    }
  })
})
