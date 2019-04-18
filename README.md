# VanillaSmoothie.js

[![npm version](https://badge.fury.io/js/vanilla-smoothie.svg)](https://badge.fury.io/js/vanilla-smoothie)

## Overview

Package that implements smooth scrolling with Vanilla JS.

[https://kimulaco.github.io/vanilla-smoothie/](https://kimulaco.github.io/vanilla-smoothie/)

## Use

### Module

```shell
# install package
npm install --save vanilla-smoothie
# or yarn install vanilla-smoothie
```

```js
import vanillaSmoothie from 'vanilla-smoothie';
// or const vanillaSmoothie =  require('vanilla-smoothie');

vanillaSmoothie.scrollTo('#anchor-01', 800);
vanillaSmoothie.scrollTo(1000, 500);
vanillaSmoothie.scrollTop(500);
```

### Browser

```html
<script src="vanilla-smoothie.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        vanillaSmoothie.scrollTo(event.target.getAttribute('href'), 500);
    });
});

document.getElementById('to-top').addEventListener('click', () => {
    vanillaSmoothie.scrollTop(500);
});
</script>
```

## Methods

### scrollTo(target[, duration, root, callback])

| Parameter | Type | Description |
----|----|----
| target | string, number | Selector or offset top. |
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

```js
// Selector
vanillaSmoothie.scrollTo('#id-name');

// Offset top
vanillaSmoothie.scrollTo(300);

vanillaSmoothie.scrollTo('#id-name', 1000, document.body, () => {
    console.log('Callback!!');
});
```

### scrollTop([duration, root, callback])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

```js
vanillaSmoothie.scrollTop(target);
```

### scrollBottom([duration, root, callback])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

```js
vanillaSmoothie.scrollBottom();
```

### Support Browser

Latest version of browser below.

- Google Chrome
- Firefox
- Safari

## development

```shell
# Install package
npm install

# JavaScript compile and launch local server
npm run dev
```

## License

[MIT License](https://github.com/kimulaco/vanilla-smoothie/blob/master/LICENSE).
