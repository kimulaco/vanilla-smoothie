# PageScroller.js

## Overview

Package that implements smooth scrolling with Vanilla JS.

[https://kimulaco.github.io/page-scroller/](https://kimulaco.github.io/page-scroller/)

### Support Browser

- Google Chrome
- Firefox
- Safari

## Use

```html
<script src="page-scroller.min.js"></script>
<script>
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function () {
        pageScroller.scrollTo(this.getAttribute('href'), 500);
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
pageScroller.scrollTo('#id-name');

// Offset top
pageScroller.scrollTo(300);
```

### scrollTop([duration, root])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |

```js
pageScroller.scrollTop(target);
```

### scrollBottom([duration, root])

| Parameter | Type | Description |
----|----|----
| duration | number | Number of milliseconds to scroll. |
| root | object | Element to Scroll. |

```js
pageScroller.scrollBottom();
```

## Development

```shell
npm install

npm run dev

npm run  build
```

## License

[MIT License](https://github.com/kimulaco/page-scroller/blob/master/LICENSE).
