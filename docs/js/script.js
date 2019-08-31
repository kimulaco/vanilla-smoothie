/* global vanillaSmoothie */
/* eslint no-console: 0, @typescript-eslint/explicit-function-return-type: 0 */
(function () {
  'use strict'

  if (typeof vanillaSmoothie === 'undefined') {
    return
  }

  const setClickEvent = function (selector, func) {
    document.querySelectorAll(selector).forEach(function (elenemt) {
      elenemt.addEventListener('click', function (event) {
        func(event)
      })
    })
  }

  vanillaSmoothie.onPopstate = (hash) => {
    vanillaSmoothie.scrollTo(hash, {
      duration: 500
    }, function () {
      console.log('scrollTo callback')
    })
  }

  setClickEvent('a[href^="#"]', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'), {
      duration: 500
    }, function () {
      console.log('scrollTo callback')
    })
  })

  setClickEvent('.js-button-top', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollTop({
      duration: 500
    }, function () {
      console.log('scrollTop callback')
    })
  })

  setClickEvent('.js-button-bottom', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollBottom({
      duration: 500
    }, function () {
      console.log('scrollBottom callback')
    })
  })
}())
