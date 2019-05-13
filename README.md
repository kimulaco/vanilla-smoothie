# VanillaSmoothie.js

[![npm version](https://badge.fury.io/js/vanilla-smoothie.svg)](https://badge.fury.io/js/vanilla-smoothie)

<!-- [GH_PAGES]
[GitHub](https://github.com/kimulaco/vanilla-smoothie)
[GH_PAGES] -->

<!-- [GH_PAGES]
<ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#use">Use</a></li>
<li><a href="#support">Support</a></li>
<li><a href="#development">Development</a></li>
<li><a href="#license">License</a></li>
</ul>
[GH_PAGES] -->

## Overview

A minimal smooth scroll library based on vanilla JavaScript. Compressed file size is less than 3KB.

This library has no dependencies on other libraries. So you can easily use it without being influenced by the presence of the framework.

[Document](https://kimulaco.github.io/vanilla-smoothie/)

## Install

### npm

```shell
npm install --save vanilla-smoothie
# or yarn install vanilla-smoothie
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vanilla-smoothie@1.2.3/dist/vanilla-smoothie.min.js"></script>
```

## Use

```js
const VanillaSmoothie = require('vanilla-smoothie')
// or import VanillaSmoothie from 'vanilla-smoothie'
const vanillaSmoothie = VanillaSmoothie()

vanillaSmoothie.scrollTo('#anchor-01', 800, () => {
  console.log('Callback!!')
})
```

### example

Anchor link

```js
const vanillaSmoothie = VanillaSmoothie()

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'))
  })
})
```

## Options

```js
const vanillaSmoothie = VanillaSmoothie({
  element: window,
  history: true,
  hash: true,
  duration: 500,
  easing: 'linear'
})
```

| Parameter | Type | Description | required, default |
----|----|----|----
| element | object | Target scroll element. | default: `window` |
| history | boolean | Enabled pushstate and popstate. | default: `true` |
| hash | boolean | Enabled url hash scroll. | default: `true` |
| duration | number | Default number of milliseconds to scroll. | default: `500` |
| easing | string | Easing name | default: `linear` |

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

## Methods

### scrollTo(target[, duration, callback])

```js
// Selector
vanillaSmoothie.scrollTo('#id-name')

// Offset Top
vanillaSmoothie.scrollTo(300)

// Callback
vanillaSmoothie.scrollTo('#id-name', 1000, () => {
  console.log('Callback!!')
})
```

| Parameter | Type | Description | required, default |
----|----|----|----
| target | string, number | Selector or offset top. | **required** |
| duration | number | Number of milliseconds to scroll. | default: `500` |
| callback | function | Callback function. | default: `null` |

### scrollTop([duration, callback])

```js
vanillaSmoothie.scrollTop(1000, () => {
  console.log('Callback!!')
})
```

| Parameter | Type | Description | required, default |
----|----|----|----
| duration | number | Number of milliseconds to scroll. | default: `500` |
| callback | function | Callback function. | default: `null` |

<!-- [GH_PAGES]
<button type="button" class="js-button-top">Page Top</button>
[GH_PAGES] -->

### scrollBottom([duration, callback])

```js
vanillaSmoothie.scrollBottom(1000, () => {
  console.log('Callback!!')
})
```

| Parameter | Type | Description | required, default |
----|----|----|----
| duration | number | Number of milliseconds to scroll. | default: `500` |
| callback | function | Callback function. | default: `null` |

<!-- [GH_PAGES]
<button type="button" class="js-button-bottom">Page Bottom</button>
[GH_PAGES] -->

## Support

Latest version of browser below.

- Google Chrome
- Firefox
- Safari

## Development

```shell
# Install package
npm install

# JavaScript compile and launch local server to http://localhost:3000
npm run dev

# Build JavaScript and Document
npm run build
```

Other commands look to `package.json`.

## License

[MIT License](https://github.com/kimulaco/vanilla-smoothie/blob/master/LICENSE).
