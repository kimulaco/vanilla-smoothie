/**
 * vanilla-smoothie.js v2.0.0
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
      linear: function (t) {
          return t;
      },
      easeInQuad: function (t) {
          return t * t;
      },
      easeOutQuad: function (t) {
          return t * (2 - t);
      },
      easeInOutQuad: function (t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function (t) {
          return t * t * t;
      },
      easeOutCubic: function (t) {
          return --t * t * t + 1;
      },
      easeInOutCubic: function (t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function (t) {
          return t * t * t * t;
      },
      easeOutQuart: function (t) {
          return 1 - --t * t * t * t;
      },
      easeInOutQuart: function (t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function (t) {
          return t * t * t * t * t;
      },
      easeOutQuint: function (t) {
          return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function (t) {
          return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
  };

  var timer = {
      duration: 500,
      start: 0
  };
  var runFrame = function (mainFunc, successCallback, failCallback) {
      var elapsed = Date.now() - timer.start;
      try {
          mainFunc(elapsed);
      }
      catch (error) {
          failCallback();
      }
      if (elapsed <= timer.duration) {
          requestAnimationFrame(function () {
              runFrame(mainFunc, successCallback, failCallback);
          });
      }
      else {
          successCallback();
      }
  };
  var animation = function (duration, mainFunc, option) {
      if (option === void 0) { option = {}; }
      var config = Object.assign({
          successCallback: function () { },
          failCallback: function () { }
      }, option);
      timer.start = Date.now();
      timer.duration = duration;
      runFrame(mainFunc, function () {
          if (typeof config.successCallback === 'function') {
              config.successCallback();
          }
      }, function () {
          if (typeof config.failCallback === 'function') {
              config.failCallback();
          }
      });
  };

  var htmlElm = document.documentElement;
  var history = window.history && window.history.pushState ?
      window.history : null;
  var VanillaSmoothie = (function () {
      function VanillaSmoothie() {
          var _this = this;
          this.cache = {
              hash: '',
              easing: 'linear',
              duration: 500,
              startOffset: 0,
              endOffset: 0,
          };
          this.getTargetOffset = function (target) {
              if (typeof target === 'number') {
                  return target;
              }
              else if (typeof target === 'string') {
                  var targetElement = document.querySelector(target);
                  if (!targetElement)
                      return 0;
                  return targetElement.getBoundingClientRect().top + window.pageYOffset;
              }
              return 0;
          };
          this.getScrollBottomOffset = function () {
              return Math.max.apply(null, [
                  document.body.clientHeight,
                  document.body.scrollHeight,
                  htmlElm.scrollHeight,
                  htmlElm.clientHeight
              ]) - window.innerHeight;
          };
          window.addEventListener('popstate', function () {
              _this.onPopstate(location.hash);
          });
      }
      VanillaSmoothie.prototype.onPopstate = function (hash) {
      };
      VanillaSmoothie.prototype.scrollTo = function (target, option, callback) {
          var _this = this;
          if (option === void 0) { option = {}; }
          var opt = Object.assign({
              element: window,
              easing: 'linear',
              duration: 500,
              adjust: 0
          }, option);
          this.cache = {
              hash: typeof target === 'string' && target[0] === '#' ? target : '',
              easing: opt.easing || 'linear',
              duration: opt.duration || 500,
              startOffset: opt.element.scrollTop || window.pageYOffset,
              endOffset: this.getTargetOffset(target) + opt.adjust
          };
          return new Promise(function (resolve, reject) {
              animation(opt.duration || 500, function (elapsed) {
                  if (opt.element === window) {
                      window.scroll(0, _this.getScrollOffset(elapsed));
                  }
                  else {
                      opt.element.scrollTop = _this.getScrollOffset(elapsed);
                  }
              }, {
                  successCallback: function () {
                      if (history && _this.cache.hash) {
                          history.pushState(null, '', _this.cache.hash);
                      }
                      if (typeof callback === 'function') {
                          callback();
                      }
                      resolve();
                  },
                  failCallback: function () {
                      reject();
                  }
              });
          });
      };
      VanillaSmoothie.prototype.scrollTop = function (option, callback) {
          return this.scrollTo(0, option, callback);
      };
      VanillaSmoothie.prototype.scrollBottom = function (option, callback) {
          return this.scrollTo(this.getScrollBottomOffset(), option, callback);
      };
      VanillaSmoothie.prototype.getScrollOffset = function (elapsed) {
          if (elapsed > this.cache.duration) {
              return this.cache.endOffset;
          }
          return this.cache.startOffset + (this.cache.endOffset - this.cache.startOffset) *
              easing[this.cache.easing](elapsed / this.cache.duration);
      };
      return VanillaSmoothie;
  }());
  var vanillaSmoothie = new VanillaSmoothie();
  if (typeof window !== 'undefined') {
      window.vanillaSmoothie = vanillaSmoothie;
  }

  return vanillaSmoothie;

}));
