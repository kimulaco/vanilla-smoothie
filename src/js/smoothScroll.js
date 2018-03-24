(function (window) {
    'use strict';

    var document = window.document;
    var body = document.body;
    var rootElement = document.documentElement;
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (func) {
            window.setTimeout(func, 15);
        };
    var clock = '';
    var time = 500;
    var context = window;
    var start = context.scrollTop || window.pageYOffset;
    var end = 0;

    /**
     * easeInOutCubic
     * @param {number} t
     * @return {number}
     */
    var easeInOutCubic = function(t) {
        return t < 0.5 ? 4 * t * t * t :
            (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    /**
     * getTargetTop
     * @param {number|string} target
     * @return {number|boolean}
     */
    var getTargetTop = function(target) {
        var targetElement = {};

        if (typeof target === 'number') {
            return target;
        } else if (typeof target === 'string') {
            targetElement = document.querySelector(target);

            if (!targetElement) {
                return false;
            }

            return targetElement.getBoundingClientRect().top + window.pageYOffset;
        }

        return false;
    };

    /**
     * getScrollTop
     * @param {number} startV
     * @param {number} endV
     * @param {number} elapsed
     * @param {number} duration
     * @return {number}
     */
    var getScrollTop = function(startV, endV, elapsed, duration) {
        if (elapsed > duration) {
            return endV;
        }

        return startV + (end - startV) * easeInOutCubic(elapsed / duration);
    };

    /**
     * getScrollPageBottom
     * @return {number}
     */
    var getScrollPageBottom = function() {
        var contentHeight = Math.max.apply(null, [body.clientHeight, body.scrollHeight, rootElement.scrollHeight, rootElement.clientHeight]);

        return contentHeight - window.innerHeight;
    };

    /**
     * scrollFrame
     * @return {number}
     */
    var scrollFrame = function() {
        var elapsed = Date.now() - clock;

        if (context === window) {
            window.scroll(0, getScrollTop(start, end, elapsed, time));
        } else {
            context.scrollTop = getScrollTop(start, end, elapsed, time);
        }

        if (elapsed <= time) {
            requestAnimationFrame(scrollFrame);
        }
    };

    var SmoothScroll = function SmoothScroll() {};

    SmoothScroll.prototype = {
        /**
         * scrollTo
         * @param {string|number} target
         * @param {number} duration
         * @param {object} root
         */
        scrollTo: function(target, duration, root) {
            clock = Date.now();
            time = duration || 500;
            context = root || window;
            start = context.scrollTop || window.pageYOffset;
            end = getTargetTop(target);

            scrollFrame();
        },

        /**
         * scrollTop
         * @param {number} duration
         * @param {object} root
         */
        scrollTop: function (duration, root) {
            this.scrollTo(0, duration, root);
        },

        /**
         * scrollBottom
         * @param {number} duration
         * @param {object} root
         */
        scrollBottom: function (duration, root) {
            this.scrollTo(getScrollPageBottom(), duration, root);
        }
    };

    window.smoothScroll = new SmoothScroll();
}(window));
