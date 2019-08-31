type MainFunc = (elapsed: number) => void
type SuccessFunc = () => void
type FailFunc = () => void

interface Config {
  successCallback: SuccessFunc
  failCallback: FailFunc
}

interface Option {
  successCallback?: SuccessFunc
  failCallback?: FailFunc
}

interface Timer {
  duration: number
  start: number
}

const timer: Timer = {
  duration: 500,
  start: 0
}

const runFrame = (
  mainFunc: MainFunc,
  successCallback: SuccessFunc,
  failCallback: FailFunc
): void => {
  const elapsed: number = Date.now() - timer.start

  try {
    mainFunc(elapsed)
  } catch (error) {
    failCallback()
  }

  if (elapsed <= timer.duration) {
    requestAnimationFrame(() => {
      runFrame(mainFunc, successCallback, failCallback)
    })
  } else {
    successCallback()
  }
}

const animation = (
  duration: number,
  mainFunc: MainFunc,
  option: Option = {}
): void => {
  const config: Config = Object.assign({
    successCallback: () => {},
    failCallback: () => {}
  }, option)

  timer.start = Date.now()
  timer.duration = duration

  runFrame(mainFunc, () => {
    if (typeof config.successCallback === 'function') {
      config.successCallback()
    }
  }, () => {
    if (typeof config.failCallback === 'function') {
      config.failCallback()
    }
  })
}



export {
  animation
}