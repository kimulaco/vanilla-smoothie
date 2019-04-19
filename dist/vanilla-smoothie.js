/** 
 * VanillaSmoothie.js v1.2.0
 * https://kimulaco.github.io/vanilla-smoothie/
 * Copyright (c) 2019 kimulaco
 * This software is released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['vanilla-smoothie'] = factory());
}(this, function () { 'use strict';

  const win = window;
  const doc = win.document;
  const body = doc.body;
  const docElement = doc.documentElement;
  const history = win.history && win.history.pushState ? win.history : null;
  let hash = '';

  /**
   * easeInOutCubic
   * @param {number} t
   * @return {number}
   */
  const easeInOutCubic = (t) => {
    return t < 0.5 ?
      4 * t * t * t :
      (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };

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
   * getScrollTop
   * @param {number} startV
   * @param {number} endV
   * @param {number} elapsed
   * @param {number} duration
   * @return {number}
   */
  const getScrollTop = (startV, endV, elapsed, duration) => {
    if (elapsed > duration) {
      return endV
    }

    return startV + (endV - startV) *
      easeInOutCubic(elapsed / duration)
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
        duration: 500
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
        win.scroll(0, getScrollTop(this.start, this.end, elapsed, this.duration));
      } else {
        this.option.element.scrollTop = getScrollTop(this.start, this.end, elapsed, this.duration);
      }

      if (elapsed <= this.duration) {
        requestAnimationFrame(this._scrollFrame);
      } else {
        if (hash && !this.popstateFlag) history.pushState(null, null, hash);

        hash = '';

        if (typeof this.callback === 'function') this.callback();
      }
    }
  }

  if (typeof window !== 'undefined') win.VanillaSmoothie = VanillaSmoothie;

  return VanillaSmoothie;

}));
