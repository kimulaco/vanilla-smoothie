# vanilla-smoothie.js

[![npm version](https://badge.fury.io/js/vanilla-smoothie.svg)](https://badge.fury.io/js/vanilla-smoothie)
[![Build Status](https://github.com/kimulaco/vanilla-smoothie/workflows/Main/badge.svg)](https://github.com/kimulaco/vanilla-smoothie/actions)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<!-- [GH_PAGES]
[GitHub](https://github.com/kimulaco/vanilla-smoothie)
[GH_PAGES] -->

- [Feature](#feature)
- [Installation](#installation)
- [Use](#use)
- [Browsers support](#browsers-support)
- [Contributing](#contributing)
- [License](#license)

## Feature

- **Simple** - It an intuitive and simple API, you can write as you like.
- **Minimal** - It doesn't depend on other packages, so it has only the minimum necessary functions.
- **Universal** - It can be used in various environments such as TypeScript and Front-end frameworks, Vanilla.js.

## Installation

### Node.js

You can install using npm or yarn and this method is recommended.

```shell
npm install --save vanilla-smoothie
```

### CDN

You can also use CDN. Suitable for creating small websites and samples.

```html
<script src="https://cdn.jsdelivr.net/npm/vanilla-smoothie@2.2.5-beta.0/dist/vanilla-smoothie.min.js"></script>
```

## Use

You can achieve smooth scroll with a simple and intuitive way of writing.

In addition, you can write any way you like, such as Callback or Promise.

```js
const vanillaSmoothie = require('vanilla-smoothie')

// Use callback
vanillaSmoothie.scrollTo('#anchor-01', {
  duration: 800
}, () => {
  console.log('Scrolled!!')
})

// Use Promise
vanillaSmoothie.scrollTo('#anchor-02', {
  duration: 800
}).then(() => {
  console.log('Scrolled!!')
})

// Use async/await
(async () => {
  await vanillaSmoothie.scrollTo('#anchor-03', {
    duration: 800
  })
  console.log('Scrolled!!')
})()
```

### Example

Sample code to easily implement the anchor link.

```js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'), {
      duration: 500
    })
  })
})
```

## Methods

### scrollTo(target[, option, callback])

Scroll to a specified destination.

For `target`, selector or offset is entered. When the selector is specified for the `target`, the target element is focused after scroll.

Refer to [Option](#option) for option parameter.

```js
// Selector
vanillaSmoothie.scrollTo('#id-name')

// Offset Top
vanillaSmoothie.scrollTo(300)

// with option and callback
vanillaSmoothie.scrollTo('#id-name', {
  duration: 1000
}, () => {
  console.log('Callback')
})
```

### scrollTop([option, callback])

Scroll to the top of the page.

Refer to [Option](#option) for option parameter.

```js
vanillaSmoothie.scrollTop(1000, () => {
  console.log('Callback')
})
```

<!-- [GH_PAGES]
<button type="button" class="js-button-top">Scroll to top</button>
[GH_PAGES] -->

### scrollBottom([duration, callback])

Scroll to the bottom of the page.

Refer to [Option](#option) for option parameter.

```js
vanillaSmoothie.scrollBottom(1000, () => {
  console.log('Callback')
})
```

<!-- [GH_PAGES]
<button type="button" class="js-button-bottom">Scroll to bottom</button>
[GH_PAGES] -->

## Option

|  Option  |  Type  |                        Description                         | default  |
| -------- | ------ | ---------------------------------------------------------- | -------- |
| element  | object | Target scroll element.                                     | `window` |
| duration | number | Default number of milliseconds to scroll.                  | `500`    |
| adjust   | number | Enter a value when you want to adjust the scroll position. | `0`      |
| easing   | string | Easing name.                                               | `linear` |

### Easing

- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions|

## Contributing

Please create an [Issue](https://github.com/kimulaco/vanilla-smoothie/issues) or [Pull requests](https://github.com/kimulaco/vanilla-smoothie/pulls) if you have any improvements!

### Development

Use yarn to download packages and run scripts.

Before creating a Pull requests, execute `yarn test` and check the operation of the library.

```shell
# Install packages
yarn

# TypeScript compile and launch local server to http://localhost:3000
yarn dev

# Build TypeScript and Document
yarn build

# Check TypeScript syntax
yarn lint

# Run E2E test
yarn test
```

Other commands look to `package.json`.

## License

[MIT License](LICENSE).
