import easing from './easing'
import { animation } from './animation'

type VanillaSmoothieTarget = string | number
type VanillaSmoothieCallbak = () => void | undefined

interface VanillaSmoothieOption {
  element?: HTMLElement
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
interface VanillaSmoothieInstance {
  onPopstate: (hash: string) => void
  scrollTo: (
    target: VanillaSmoothieTarget,
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ) => Promise<void>
  scrollTop: (
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ) => Promise<void>
  scrollBottom: (
    option: VanillaSmoothieOption,
    callback: VanillaSmoothieCallbak
  ) => Promise<void>
}
interface VanillaSmoothieWindow extends Window {
  vanillaSmoothie: VanillaSmoothieInstance
}



// eslint-disable-next-line init-declarations
declare const window: VanillaSmoothieWindow



class VanillaSmoothie {
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
  onPopstate (hash: string): void {
    // Do nothing default
  }
  /* eslint-enable */

  scrollTo (
    target: VanillaSmoothieTarget,
    option: VanillaSmoothieOption = {},
    callback?: VanillaSmoothieCallbak | undefined
  ): Promise<void> {
    const history = window.history && window.history.pushState ?
      window.history : null
    const opt = Object.assign({
      element: window,
      easing: 'linear',
      duration: 500,
      adjust: 0
    }, option)

    if (!this.validateArgvType(target, opt, callback)) {
      return Promise.reject()
    }

    this.cache = {
      hash: typeof target === 'string' && target[0] === '#' ? target : '',
      easing: opt.easing || 'linear',
      duration: opt.duration || 500,
      startOffset: opt.element.scrollTop || window.pageYOffset,
      endOffset: this.getTargetOffset(target) + opt.adjust
    }

    return new Promise((resolve, reject): void => {
      animation(opt.duration || 500, (elapsed: number) => {
        if (opt.element === window) {
          window.scroll(0, this.getScrollOffset(elapsed))
        } else {
          opt.element.scrollTop = this.getScrollOffset(elapsed)
        }
      }, {
        successCallback: () => {
          const targetElement = this.getTargetElement(target)

          if (history && this.cache.hash) history.pushState(null, '', this.cache.hash)
          if (targetElement) this.adjustFocus(targetElement)
          if (typeof callback === 'function') callback()

          window.addEventListener('popstate', this.handlePopstate.bind(this))
          resolve()
        },
        failCallback: () => {
          reject()
        }
      })
    })
  }

  scrollTop (
    option: VanillaSmoothieOption,
    callback?: VanillaSmoothieCallbak
  ): Promise<void> {
    return this.scrollTo(0, option, callback)
  }

  scrollBottom (
    option: VanillaSmoothieOption,
    callback?: VanillaSmoothieCallbak
  ): Promise<void> {
    return this.scrollTo(this.getScrollBottomOffset(), option, callback)
  }

  private handlePopstate(): void {
    this.onPopstate(location.hash)
  }

  private validateArgvType (
    target: VanillaSmoothieTarget,
    option: VanillaSmoothieOption,
    callback?: VanillaSmoothieCallbak
  ): boolean {
    let isValid = true

    if (!/^(string|number)$/.test(typeof target)) {
      console.error('target must be of type string or number.')
      isValid = false
    }

    if (!/^(string)$/.test(typeof option.easing)) {
      console.error('easing option must be of type string.')
      isValid = false
    }

    if (!/^(number)$/.test(typeof option.duration)) {
      console.error('duration option must be of type number.')
      isValid = false
    }

    if (!/^(number)$/.test(typeof option.adjust)) {
      console.error('adjust option must be of type number.')
      isValid = false
    }

    if (!/^(undefined|function)$/.test(typeof callback)) {
      console.error('callback option must be of type function.')
      isValid = false
    }

    return isValid
  }

  private adjustFocus (targetElement: HTMLElement): void {
    const defaultTabindex: string | null = targetElement.getAttribute('tabindex')
    const defaultOutline: string | null = targetElement.style.outline

    const onBlurTargetHandler = (): void => {
      if (defaultTabindex) {
        targetElement.setAttribute('tabindex', defaultTabindex)
      } else {
        targetElement.removeAttribute('tabindex')
      }

      if (!defaultOutline) targetElement.style.outline = ''

      targetElement.removeEventListener('blur', onBlurTargetHandler)
    }

    if (!defaultTabindex) targetElement.setAttribute('tabindex', '-1')
    if (!defaultOutline) targetElement.style.outline = 'none'

    targetElement.focus()
    targetElement.addEventListener('blur', onBlurTargetHandler)
  }

  private getScrollOffset (elapsed: number): number {
    if (elapsed > this.cache.duration) {
      return this.cache.endOffset
    }
    return this.cache.startOffset + (this.cache.endOffset - this.cache.startOffset) *
      easing[this.cache.easing](elapsed / this.cache.duration)
  }

  private getTargetElement = (target: VanillaSmoothieTarget): HTMLElement | null => {
    if (typeof target === 'string') {
      return document.querySelector(target)
    }
    return null
  }

  private getTargetOffset = (target: VanillaSmoothieTarget): number => {
    if (typeof target === 'number') {
      return target
    } else if (typeof target === 'string') {
      const targetElement: HTMLElement | null = this.getTargetElement(target)
      if (!targetElement) return 0
      return targetElement.getBoundingClientRect().top + window.pageYOffset
    }
    return 0
  }

  private getScrollBottomOffset = (): number => {
    const htmlElm = document.documentElement
    return Math.max.apply(null, [
      document.body.clientHeight,
      document.body.scrollHeight,
      htmlElm.scrollHeight,
      htmlElm.clientHeight
    ]) - window.innerHeight
  }
}



const vanillaSmoothie: VanillaSmoothieInstance = new VanillaSmoothie()

export default vanillaSmoothie

if (typeof window !== 'undefined') {
  window.vanillaSmoothie = vanillaSmoothie
}
