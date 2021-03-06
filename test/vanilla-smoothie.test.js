const playwright = require('playwright')
const pkg = require('../package')
const BROWSER_TYPES = ['chromium', 'firefox', 'webkit']
const CHROMIUM_CONFIG = {
  args: ['--no-sandbox']
}

for (const browserType of BROWSER_TYPES) {
  describe(`Library test by ${browserType}`, () => {
    let browser
    let page

    beforeAll(async () => {
      let browserOption = {}
      if (browserType === 'chromium') {
        browserOption = CHROMIUM_CONFIG
      }
      browser = await playwright[browserType].launch(browserOption)
      const context = await browser.newContext()
      page = await context.newPage()
      await page.goto('http://localhost:3000')
    })

    describe('Offset', () => {
      test('scrollTo(target: string)', async () => {
        const isCorrectScrollPosition = await page.evaluate(async () => {
          const TARGET_ID_NAME = 'contributing'
          const targetTop = document.getElementById(TARGET_ID_NAME).offsetTop
          await window.vanillaSmoothie.scrollTo(`#${TARGET_ID_NAME}`, {
            duration: 100
          })
          return window.pageYOffset === targetTop
        })
        expect(isCorrectScrollPosition).toBeTruthy()
      })

      test('scrollTo(target: number)', async () => {
        const isCorrectScrollPosition = await page.evaluate(async () => {
          const TARGET_OFFSET_TOP = 500
          await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP, {
            duration: 100
          })
          return window.pageYOffset === TARGET_OFFSET_TOP
        })
        expect(isCorrectScrollPosition).toBeTruthy()
      })

      test('scrollTo(target: number, { adjust: 100 })', async () => {
        const isCorrectScrollPosition = await page.evaluate(async () => {
          const TARGET_OFFSET_TOP = 500
          const ADJUST_VALUE = 100
          await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP, {
            duration: 100,
            adjust: ADJUST_VALUE
          })
          return window.pageYOffset === TARGET_OFFSET_TOP + ADJUST_VALUE
        })
        expect(isCorrectScrollPosition).toBeTruthy()
      })

      test('scrollTo(target: number, { adjust: -100 })', async () => {
        const isCorrectScrollPosition = await page.evaluate(async () => {
          const TARGET_OFFSET_TOP = 500
          const ADJUST_VALUE = -100
          await window.vanillaSmoothie.scrollTo(TARGET_OFFSET_TOP, {
            duration: 100,
            adjust: ADJUST_VALUE
          })
          return window.pageYOffset === TARGET_OFFSET_TOP + ADJUST_VALUE
        })
        expect(isCorrectScrollPosition).toBeTruthy()
      })

      test('scrollTop()', async () => {
        const isCorrectScrollPosition = await page.evaluate(async () => {
          window.scrollTo(0, 500)
          await window.vanillaSmoothie.scrollTop({
            duration: 100
          })
          return window.pageYOffset === 0
        })
        expect(isCorrectScrollPosition).toBeTruthy()
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
          await window.vanillaSmoothie.scrollBottom({
            duration: 100
          })
          return window.pageYOffset === bottomYOffset
        })
        expect(isCorrectScrollPosition).toBeTruthy()
      })
    })

    describe('Usability', () => {
      test('Focus after scroll', async () => {
        const isCorrectScrolledFocusId = await page.evaluate(async () => {
          const TARGET_ID_NAME = 'use'
          await window.vanillaSmoothie.scrollTo(`#${TARGET_ID_NAME}`, {
            duration: 100
          })
          return document.activeElement.id === TARGET_ID_NAME
        })
        expect(isCorrectScrolledFocusId).toBeTruthy()
      })

      test('Hash after scroll', async () => {
        const isCorrectScrolledFocusId = await page.evaluate(async () => {
          const TARGET_ID_NAME = 'use'
          await window.vanillaSmoothie.scrollTo(`#${TARGET_ID_NAME}`, {
            duration: 100
          })
          return document.activeElement.id === TARGET_ID_NAME
        })
        expect(isCorrectScrolledFocusId).toBeTruthy()
      })
    })

    afterAll(async () => {
      await browser.close()
    })
  })
}

describe('Document page test', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await playwright.chromium.launch(CHROMIUM_CONFIG)
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost:3000')
  })

  test('Valid CDN version', async () => {
    const pageContent = await page.content()
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/vanilla-smoothie@'
      + pkg.version
      + '/dist/vanilla-smoothie.min.js'
    await expect(pageContent).toMatch(cdnUrl)
  })

  test('Load vanilla-smoothie.min.js', async () => {
    const isLoadedLibrary = await page.evaluate(async () => {
      return window.vanillaSmoothie
    })
    expect(isLoadedLibrary).toBeTruthy()
  })

  afterAll(async () => {
    await browser.close()
  })
})
