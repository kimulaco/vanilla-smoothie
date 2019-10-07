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

  vanillaSmoothie.onPopstate = async (hash) => {
    await vanillaSmoothie.scrollTo(hash, {
      duration: 500
    })
    console.log('scrollTo callback')
  }

  setClickEvent('a[href^="#"]', async (event) => {
    event.preventDefault()
    try {
      await vanillaSmoothie.scrollTo(event.target.getAttribute('href'), {
        duration: 500
      })
      console.log('scrollTo callback')
    } catch (error) {
      console.error(error)
    }
  })

  setClickEvent('.js-button-top', async (event) => {
    event.preventDefault()
    await vanillaSmoothie.scrollTop({
      duration: 500
    })
    console.log('scrollTop callback')
  })

  setClickEvent('.js-button-bottom', async (event) => {
    event.preventDefault()
    await vanillaSmoothie.scrollBottom({
      duration: 500
    })
    console.log('scrollBottom callback')
  })
}())
