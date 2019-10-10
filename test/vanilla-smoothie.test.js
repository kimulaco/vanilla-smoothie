/* global browser */
let page

beforeAll(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:3000')
})

test('should display `google` text on page', async () => {
  await expect(page).toMatch('vanilla-smoothie.js')
})