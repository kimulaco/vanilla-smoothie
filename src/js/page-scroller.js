const win = window;
const doc = win.document;
const body = doc.body;
const rootElement = doc.documentElement;
const requestAnimationFrame =
    win.requestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    function (func) {
        win.setTimeout(func, 15);
    };
let clock = Date.now();
let time = 500;
let context = win;
let start = context.scrollTop || win.pageYOffset;
let end = 0;
let callbackFunc = null;

/**
 * easeInOutCubic
 * @param {number} t
 * @return {number}
 */
const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t :
        (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

/**
 * getScrollPageBottom
 * @return {number}
 */
const getScrollPageBottom = () => {
    return Math.max.apply(null, [
        body.clientHeight,
        body.scrollHeight,
        rootElement.scrollHeight,
        rootElement.clientHeight
    ]) - win.innerHeight;
};

/**
 * getTargetTop
 * @param {number|string} target
 * @return {number|boolean}
 */
const getTargetTop = (target) => {
    let targetElement = {};

    if (typeof target === 'number') {
        return target;
    } else if (typeof target === 'string') {
        targetElement = doc.querySelector(target);

        if (!targetElement) {
            return false;
        }

        return targetElement.getBoundingClientRect().top + win.pageYOffset;
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
const getScrollTop = (startV, endV, elapsed, duration) => {
    if (elapsed > duration) {
        return endV;
    }

    return startV + (end - startV) *
        easeInOutCubic(elapsed /duration);
};

/**
 * scrollFrame
 * @return {number}
 */
const scrollFrame = () =>  {
    const elapsed = Date.now() - clock;

    if (context === win) {
        win.scroll(0, getScrollTop(start, end, elapsed, time));
    } else {
        context.scrollTop = getScrollTop(start, end, elapsed, time);
    }

    if (elapsed <= time) {
        requestAnimationFrame(scrollFrame);
    } else {
        if (typeof callbackFunc === 'function') {
            callbackFunc();
        }
    }
};

/**
 * PageScroller
 * @constructor
 */
class PageScroller {
    /**
     * scrollTo
     * @param {string|number} target
     * @param {number} duration
     * @param {object} root
     * @param {function} callback
     * @return {void}
     */
    scrollTo(target, duration, root, callback) {
        clock = Date.now();
        time = duration || 500;
        context = root || win;
        start = context.scrollTop || window.pageYOffset;
        end = getTargetTop(target);
        callbackFunc = callback;

        scrollFrame();
    }

    /**
     * scrollTop
     * @param {number} duration
     * @param {object} root
     * @param {function} callback
     * @return {void}
     */
    scrollTop(duration, root, callback) {
        this.scrollTo(0, duration, root, callback);
    }

    /**
     * scrollBottom
     * @param {number} duration
     * @param {object} root
     * @param {function} callback
     * @return {void}
     */
    scrollBottom(duration, root, callback) {
        this.scrollTo(getScrollPageBottom(), duration, root, callback);
    }
}

export default new PageScroller();

if (
    typeof exports !== 'object' &&
    typeof module === 'undefined' &&
    typeof window !== 'undefined'
) {
    window.pageScroller = new PageScroller();
}
