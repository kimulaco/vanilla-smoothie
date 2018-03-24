# SmoothScroll.js

## Overview

Package that implements smooth scrolling with Vanilla JS.

### Support Browser

- Google Chrome
- Firefox
- Safari

## Use

```html
<script src="smoothScroll.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function () {
        smoothScroll.scrollTo(this.getAttribute('href'), 500);
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

```js
// Selector
smoothScroll.scrollTo('#id-name');

// Offset top
smoothScroll.scrollTo(300);
```

### scrollTop([duration, root])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |

```js
smoothScroll.scrollTop(target);
```

### scrollBottom([duration, root])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |

```js
smoothScroll.scrollBottom();
```

## License

[MIT License](https://github.com/kmrk/smooth-scroll/blob/master/LICENSE).
