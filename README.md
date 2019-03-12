# VanillaSmoothie.js

## Overview

Package that implements smooth scrolling with Vanilla JS.

[https://kimulaco.github.io/vanilla-smoothie/](https://kimulaco.github.io/vanilla-smoothie/)

## Use

### API

```shell
# install package
npm install --sace vanilla-smoothie
```

```js
import vanillaSmoothie from 'vanilla-smoothie';
// or const vanillaSmoothie =  require('vanilla-smoothie');

vanillaSmoothie.scrollTo('#anchor-01');
vanillaSmoothie.scrollTo(1000);
vanillaSmoothie.scrollTop();
vanillaSmoothie.scrollBottom();
```

### Browser

```html
<script src="vanilla-smoothie.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function () {
        vanillaSmoothie.scrollTo(this.getAttribute('href'), 500);
    });
});
</script>
```

## Methods

### scrollTo(target[, duration, root])

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

### scrollTop([duration, root])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |
| callback | function | Callback function. |

```js
vanillaSmoothie.scrollTop(target);
```

### scrollBottom([duration, root])

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

## License

[MIT License](https://github.com/kimulaco/vanilla-smoothie/blob/master/LICENSE).
