/* global vanillaSmoothie */
/* eslint no-console: 0 */
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

  setClickEvent('a[href^="#"]', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollTo(event.target.getAttribute('href'), 500, null, function () {
      console.log('scrollTo callback')
    })
  })

  setClickEvent('.js-button-top', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollTop(500, null, function () {
      console.log('scrollTop callback')
    })
  })

  setClickEvent('.js-button-bottom', function (event) {
    event.preventDefault()
    vanillaSmoothie.scrollBottom(500, null, function () {
      console.log('scrollBottom callback')
    })
  })
}())
