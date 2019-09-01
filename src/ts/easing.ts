const easing: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
  linear (t: number): number {
    return t
  },
  easeInQuad (t: number): number {
    return t * t
  },
  easeOutQuad (t: number): number {
    return t * (2 - t)
  },
  easeInOutQuad (t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  easeInCubic (t: number): number {
    return t * t * t
  },
  easeOutCubic (t: number): number {
    return --t * t * t + 1
  },
  easeInOutCubic (t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  easeInQuart (t: number): number {
    return t * t * t * t
  },
  easeOutQuart (t: number): number {
    return 1 - --t * t * t * t
  },
  easeInOutQuart (t: number): number {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  },
  easeInQuint (t: number): number {
    return t * t * t * t * t
  },
  easeOutQuint (t: number): number {
    return 1 + --t * t * t * t * t
  },
  easeInOutQuint (t: number): number {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
  }
}

export default easing
