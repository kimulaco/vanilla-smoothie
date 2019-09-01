import easing from './easing'
import { animation } from './animation'

type VanillaSmoothieTarget = string | number
type VanillaSmoothieCallbak = () => void
interface VanillaSmoothieWindow extends Window {
  vanillaSmoothie: any
}
interface VanillaSmoothieOption {
  element?: any
  easing?: string;
  duration?: number
  adjust?: number
}
interface VanillaSmoothieCache {
  hash: string
  easing: string
  duration: number
  startOffset: number
  endOffset: number
}



declare const window: VanillaSmoothieWindow

const htmlElm = document.documentElement
const history = window.history && window.history.pushState ?
  window.history : null



class VanillaSmoothie {
  constructor() {
    window.addEventListener('popstate', () => {
      this.onPopstate(location.hash)
    })
  }

  private cache: VanillaSmoothieCache = {
    hash: '',
    easing: 'linear',
    duration: 500,
    startOffset: 0,
    endOffset: 0,
  }

  /*
    eslint-disable
    @typescript-eslint/no-unused-vars,
    @typescript-eslint/explicit-function-return-type
  */
  onPopstate (hash: string) {
    // Do nothing default
  }
  /* eslint-enable */

  scrollTo (
    target: VanillaSmoothieTarget,
    option: VanillaSmoothieOption = {},
    callback: VanillaSmoothieCallbak
  ): void {
    const opt = Object.assign({
      element: htmlElm,
      easing: 'linear',
      duration: 500,
      adjust: 0
    }, option)
    this.cache = {
      hash: typeof target === 'string' && target[0] === '#' ? target : '',
      easing: opt.easing || 'linear',
      duration: opt.duration || 500,
      startOffset: opt.element.scrollTop || window.pageYOffset,
      endOffset: this.getTargetOffset(target) + opt.adjust
    }

    animation(opt.duration || 500, (elapsed: number) => {
      if (opt.element === window) {
        window.scroll(0, this.getScrollOffset(elapsed))
      } else {
        opt.element.scrollTop = this.getScrollOffset(elapsed)
      }
    }, {
      successCallback: () => {
        if (history && this.cache.hash) {
          history.pushState(null, '', this.cache.hash)
        }
        if (typeof callback === 'function') {
          callback()
        }
      }
    })
  }

  scrollTop (
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ): void {
    this.scrollTo(0, option, callback)
  }

  scrollBottom (
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ): void {
    this.scrollTo(this.getScrollBottomOffset(), option, callback)
  }

  private getScrollOffset (elapsed: number): number {
    if (elapsed > this.cache.duration) {
      return this.cache.endOffset
    }
    return this.cache.startOffset + (this.cache.endOffset - this.cache.startOffset) *
      easing[this.cache.easing](elapsed / this.cache.duration)
  }

  private getTargetOffset = (target: VanillaSmoothieTarget): number => {
    if (typeof target === 'number') {
      return target
    } else if (typeof target === 'string') {
      const targetElement: any = document.querySelector(target)
      if (!targetElement) return 0
      return targetElement.getBoundingClientRect().top + window.pageYOffset
    }
    return 0
  }

  private getScrollBottomOffset = (): number => {
    return Math.max.apply(null, [
      document.body.clientHeight,
      document.body.scrollHeight,
      htmlElm.scrollHeight,
      htmlElm.clientHeight
    ]) - window.innerHeight
  }
}



const vanillaSmoothie = new VanillaSmoothie()

export default vanillaSmoothie

if (typeof window !== 'undefined') {
  window.vanillaSmoothie = vanillaSmoothie
}
