/* global browser */
const pkg = require('../package')

let page

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
})

describe('Document', () => {
  test('Valid CDN version', async () => {
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/vanilla-smoothie@'
      + pkg.version
      + '/dist/vanilla-smoothie.min.js'
    await expect(page).toMatch(cdnUrl)
  })

  test('Load vanilla-smoothie.min.js', async () => {
    const isLoadedLibrary = await page.evaluate(async () => {
      return window.vanillaSmoothie
    })
    expect(isLoadedLibrary).toBeTruthy()
  })
})

describe('Offset', () => {
  test('scrollTo(target: string)', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const TARGET_ID_NAME = 'contributing'
      const targetTop = document.getElementById(TARGET_ID_NAME).offsetTop
      await window.vanillaSmoothie.scrollTo(`#${TARGET_ID_NAME}`)
      return window.pageYOffset === targetTop
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })

  test('scrollTo(target: number)', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const TARGET_OFFSET_TOP = 500;
      await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP)
      return window.pageYOffset === TARGET_OFFSET_TOP
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })

  test('scrollTo(target: number, { adjust: 100 })', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const TARGET_OFFSET_TOP = 500;
      const ADJUST_VALUE = 100;
      await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP, {
        adjust: ADJUST_VALUE
      })
      return window.pageYOffset === TARGET_OFFSET_TOP + ADJUST_VALUE
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })

  test('scrollTo(target: number, { adjust: -100 })', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const TARGET_OFFSET_TOP = 500;
      const ADJUST_VALUE = -100;
      await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP, {
        adjust: ADJUST_VALUE
      })
      return window.pageYOffset === TARGET_OFFSET_TOP + ADJUST_VALUE
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })

  test('scrollTop()', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      window.scrollTo(0, 500)
      await window.vanillaSmoothie.scrollTop()
      return window.pageYOffset === 0
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })

  test('scrollBottom()', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const htmlElm = document.documentElement
      const bottomYOffset = Math.max.apply(null, [
        document.body.clientHeight,
        document.body.scrollHeight,
        htmlElm.scrollHeight,
        htmlElm.clientHeight
      ]) - window.innerHeight
      await window.vanillaSmoothie.scrollBottom()
      return window.pageYOffset === bottomYOffset
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })
})
