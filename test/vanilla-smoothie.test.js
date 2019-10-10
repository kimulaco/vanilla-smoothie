/* global browser */
const pkg = require('../package')

let page

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
})

test('Valid CDN version', async () => {
  await expect(page).toMatch(`https://cdn.jsdelivr.net/npm/vanilla-smoothie@${pkg.version}/dist/vanilla-smoothie.min.js`)
})
