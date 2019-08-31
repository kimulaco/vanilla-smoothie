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
  easing: string
  duration: number
  startTime: number
  startOffset: number
  endOffset: number
}



declare const window: VanillaSmoothieWindow

const htmlElm = document.documentElement
// const history = window.history && window.history.pushState ?
//   window.history : null
const defaultOption: VanillaSmoothieOption = {
  element: htmlElm,
  easing: 'linear',
  duration: 500,
  adjust: 0
}



class VanillaSmoothie {
  private cache: VanillaSmoothieCache = {
    easing: 'easeInQuad',
    duration: 500,
    startTime: 0,
    startOffset: 0,
    endOffset: 0,
  }

  scrollTo (
    target: VanillaSmoothieTarget,
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ): void {
    option = Object.assign(defaultOption, option)
    this.cache = {
      easing: option.easing || 'easeInQuad',
      duration: option.duration || 500,
      startTime: Date.now(),
      startOffset: option.element.scrollTop || window.pageYOffset,
      endOffset: this.getTargetOffset(target)
    }

    animation(option.duration, (elapsed: number) => {
      if (option.element === window) {
        window.scroll(0, this.getScrollOffset(elapsed))
      } else {
        option.element.scrollTop = this.getScrollOffset(elapsed)
      }
    }, {
      successCallback: callback
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
