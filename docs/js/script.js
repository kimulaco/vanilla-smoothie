/* global smoothScroll */
(function () {
    'use strict';

    if (typeof smoothScroll === 'undefined') {
        return;
    }

    var setClickEvent = function (selector, func) {
        document.querySelectorAll(selector).forEach(function (elenemt) {
            elenemt.addEventListener('click', function (event) {
                func(event);
            });
        });
    };

    setClickEvent('a[href^="#"]', function (event) {
        event.preventDefault();

        smoothScroll.scrollTo(event.target.getAttribute('href'), 500, null, function () {
            console.log('Callback')
        });
    });

    setClickEvent('.js-button-page', function (event) {
        event.preventDefault();

        smoothScroll.scrollTop(500, null, function () {
            console.log('Callback')
        });
    });

    setClickEvent('.js-button-bottom', function (event) {
        event.preventDefault();

        smoothScroll.scrollBottom(500, null, function () {
            console.log('Callback')
        });
    });
}());
