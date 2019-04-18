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

A minimal smooth scroll library based on vanilla JavaScript.

This library has no dependencies on other libraries. So you can easily use it without being influenced by the presence of the framework.

[Document](https://kimulaco.github.io/vanilla-smoothie/)

## Use

### API

```shell
# install package
npm install --save vanilla-smoothie
# or yarn install vanilla-smoothie
```

```js
import vanillaSmoothie from 'vanilla-smoothie'
// or const vanillaSmoothie =  require('vanilla-smoothie')

vanillaSmoothie.scrollTo('#anchor-01', 800)
vanillaSmoothie.scrollTo(1000, 500)
vanillaSmoothie.scrollTop(500)
```

### Browser

```html
<script src="vanilla-smoothie.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'), 500)
  })
})

document.getElementById('to-top').addEventListener('click', () => {
  vanillaSmoothie.scrollTop(500)
})
</script>
```

## Methods

### scrollTo(target[, duration, root, callback])

```js
// Selector
vanillaSmoothie.scrollTo('#id-name')

// Offset top
vanillaSmoothie.scrollTo(300)

vanillaSmoothie.scrollTo('#id-name', 1000, document.body, () => {
  console.log('Callback!!')
})
```

| Parameter | Type | Description |
----|----|----
| target | string, number | Selector or offset top. |
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

### scrollTop([duration, root, callback])

```js
vanillaSmoothie.scrollTop(target)
```

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

<!-- [GH_PAGES]
<button type="button" class="js-button-top">Page Top</button>
[GH_PAGES] -->

### scrollBottom([duration, root, callback])

```js
vanillaSmoothie.scrollBottom()
```

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

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
