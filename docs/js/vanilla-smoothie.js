/** 
 * VanillaSmoothie.js v1.2.1
 * https://kimulaco.github.io/vanilla-smoothie/
 * Copyright (c) 2019 kimulaco
 * This software is released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['vanilla-smoothie'] = factory());
}(this, function () { 'use strict';

  var easing = {
    linear(t) {
      return t
    },
    easeInQuad(t) {
      return t * t
    },
    easeOutQuad(t) {
      return t * (2 - t)
    },
    easeInOutQuad(t) {
      return t < 0.5 ?
        2 * t * t :
        -1 + (4 - 2 * t) * t
    },
    easeInCubic(t) {
      return t * t * t
    },
    easeOutCubic(t) {
      return --t * t * t + 1
    },
    easeInOutCubic(t) {
      return t < 0.5 ?
        4 * t * t * t :
        (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart(t) {
      return t * t * t * t
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t
    },
    easeInOutQuart(t) {
      return t < 0.5 ?
        8 * t * t * t * t :
        1 - 8 * --t * t * t * t
    },
    easeInQuint(t) {
      return t * t * t * t * t
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t
    },
    easeInOutQuint(t) {
      return t < 0.5 ?
        16 * t * t * t * t * t :
        1 + 16 * --t * t * t * t * t
    }
  };

  const win = window;
  const doc = win.document;
  const body = doc.body;
  const docElement = doc.documentElement;
  const history = win.history && win.history.pushState ? win.history : null;
  let hash = '';

  /**
   * getScrollPageBottom
   * @return {number}
   */
  const getScrollPageBottom = () => {
    return Math.max.apply(null, [
      body.clientHeight,
      body.scrollHeight,
      docElement.scrollHeight,
      docElement.clientHeight
    ]) - win.innerHeight
  };

  /**
   * getTargetTop
   * @param {number|string} target
   * @return {number|boolean}
   */
  const getTargetTop = (target) => {
    let targetElement = {};

    if (typeof target === 'number') {
      return target
    } else if (typeof target === 'string') {
      if (target[0] === '#') hash = target;

      targetElement = doc.querySelector(target);

      if (!targetElement) return false

      return targetElement.getBoundingClientRect().top + win.pageYOffset
    }

    return false
  };

  /**
   * VanillaSmoothie
   * @constructor
   * @param {object}
   */
  class VanillaSmoothie {
    constructor(option = {}) {
      this.option = Object.assign({
        element: win,
        history: true,
        hash: true,
        duration: 500,
        easing: 'linear'
      }, option);
      this.start = this.option.element.scrollTop || win.pageYOffset;
      this.duration = this.option.duration;
      this.end = 0;
      this.clock = null;
      this.callback = null;
      this.popstateFlag = false;
      this._scrollFrame = this._frame.bind(this);

      if (this.option.history) {
        win.addEventListener('popstate', () => {
          if (location.hash) {
            this._privateScrollTo(location.hash);
          } else {
            this._privateScrollTo(0);
          }
        });
      }

      if (this.option.hash) this._privateScrollTo(location.hash);
    }

    /**
     * scrollTo
     * @param {string|number} target
     * @param {number} duration
     * @param {function} callback
     * @return {void}
     */
    scrollTo(target, duration, callback) {
      this.clock = Date.now();
      this.start = this.option.element.scrollTop || window.pageYOffset;
      this.end = getTargetTop(target);
      this.callback = callback;
      this.duration = duration || this.option.duration;

      this._scrollFrame();
    }

    /**
     * scrollTop
     * @param {number} duration
     * @param {object} root
     * @param {function} callback
     * @return {void}
     */
    scrollTop(duration, callback) {
      this.scrollTo(0, duration, callback);
    }

    /**
     * scrollBottom
     * @param {number} duration
     * @param {object} root
     * @param {function} callback
     * @return {void}
     */
    scrollBottom(duration, callback) {
      this.scrollTo(getScrollPageBottom(), duration, callback);
    }

    _privateScrollTo(target) {
      this.popstateFlag = true;
      this.scrollTo(target, this.option.duration, () => {
        this.popstateFlag = false;
      });
    }

    /**
     * _frame
     * @return {void}
     */
    _frame() {
      const elapsed = Date.now() - this.clock;

      if (this.option.element === win) {
        win.scroll(0, this._getTop(elapsed));
      } else {
        this.option.element.scrollTop = this._getTop(elapsed);
      }

      if (elapsed <= this.duration) {
        requestAnimationFrame(this._scrollFrame);
      } else {
        if (hash && !this.popstateFlag) history.pushState(null, null, hash);

        hash = '';

        if (typeof this.callback === 'function') this.callback();
      }
    }

    /**
     * _getTop
     * @param {number} elapsed
     * @return {number}
     */
    _getTop(elapsed) {
      if (elapsed > this.duration) {
        return this.end
      }

      return this.start + (this.end - this.start) *
        easing[this.option.easing](elapsed / this.duration)
    }
  }

  if (typeof window !== 'undefined') win.VanillaSmoothie = VanillaSmoothie;

  return VanillaSmoothie;

}));
