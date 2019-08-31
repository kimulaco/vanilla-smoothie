# VanillaSmoothie.js

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/vanilla-smoothie.svg)](https://badge.fury.io/js/vanilla-smoothie)
[![Build Status](https://travis-ci.org/kimulaco/vanilla-smoothie.svg?branch=master)](https://travis-ci.org/kimulaco/vanilla-smoothie)

<!-- [GH_PAGES]
[GitHub](https://github.com/kimulaco/vanilla-smoothie)
[GH_PAGES] -->

- [Overview](#overview)
- [Use](#use)
- [Support browsers](#support-browsers)
- [Contributing](#contributing)
- [License](#license)

## Overview

A minimal smooth scroll library.

This library has no dependencies on other libraries. So you can easily use it without being influenced by the presence of the framework.

[Document](https://kimulaco.github.io/vanilla-smoothie/)

## Use

### Node.js

You can install use npm or yarn.

```shell
yarn add vanilla-smoothie
```

You can achieve smooth scroll with a simple and intuitive way of writing.

```js
const vanillaSmoothie = require('vanilla-smoothie')

vanillaSmoothie.scrollTo('#anchor-01', {
  duration: 800
}, () => {
  console.log('Callback!!')
})
```

### Browser

You can also get the this library with CDN or Zip download. Ideal for small samples.

```html
<script src="https://cdn.jsdelivr.net/npm/vanilla-smoothie@1.2.4/dist/vanilla-smoothie.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'), {
      duration: 500
    })
  })
})
</script>
```

## Methods

### scrollTo(target[, option, callback])

Scroll to a specified destination.

You can specify selector or offset top for the `target`.

Refer to (Option)[#option] for option parameter.

```js
// Selector
vanillaSmoothie.scrollTo('#id-name')

// Offset Top
vanillaSmoothie.scrollTo(300)

// with option and callback
vanillaSmoothie.scrollTo('#id-name', {
  duration: 1000
}, () => {
  console.log('Callback!!')
})
```

### scrollTop([option, callback])

Scroll to the top of the page.

Refer to (Option)[#option] for option parameter.

```js
vanillaSmoothie.scrollTop(1000, () => {
  console.log('Callback!!')
})
```

<!-- [GH_PAGES]
<button type="button" class="js-button-top">Page Top</button>
[GH_PAGES] -->

### scrollBottom([duration, callback])

Scroll to the bottom of the page.

Refer to (Option)[#option] for option parameter.

```js
vanillaSmoothie.scrollBottom(1000, () => {
  console.log('Callback!!')
})
```

<!-- [GH_PAGES]
<button type="button" class="js-button-bottom">Page Bottom</button>
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

## Support browsers

Latest version of browser below.

- Google Chrome
- Firefox
- Safari

## Contributing

Please create an [Issue](https://github.com/kimulaco/vanilla-smoothie/issues) or [Pull requests](https://github.com/kimulaco/vanilla-smoothie/pulls) if you have any improvements!

### Development

You can use yarn or npm.

```shell
# Install package
yarn

# JavaScript compile and launch local server to http://localhost:3000
yarn dev

# Build JavaScript and Document
yarn build
```

Other commands look to `package.json`.

## License

[MIT License](LICENSE).
