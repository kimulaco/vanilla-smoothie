/* global browser */
const pkg = require('../package')

let page

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
})

describe('Document Test', () => {
  test('Valid CDN version', async () => {
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/vanilla-smoothie@'
      + pkg.version
      + '/dist/vanilla-smoothie.min.js'
    await expect(page).toMatch(cdnUrl)
  })

  test('Load vanilla-smoothie.js', async () => {
    const isLoadedLibrary = await page.evaluate(async () => {
      return window.vanillaSmoothie
    })
    expect(isLoadedLibrary).toBeTruthy()
  })
})

describe('Methods Test', () => {
  test('scrollTo(target: string)', async () => {
    const isCorrectScrollPosition = await page.evaluate(async () => {
      const targetIdName = 'contributing'
      const targetTop = document.getElementById(targetIdName).offsetTop
      await window.vanillaSmoothie.scrollTo(`#${targetIdName}`)
      const scrollTop = window.pageYOffset
      return targetTop === scrollTop
    })
    await expect(isCorrectScrollPosition).toBeTruthy()
  })
})
