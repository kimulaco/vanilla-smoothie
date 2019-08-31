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

let timer: Timer = {
  duration: 500,
  start: 0
}

const runFrame = (mainFunc: MainFunc, successCallback: any, failCallback: any): any => {
  const elapsed: number = Date.now() - timer.start

  try {
    mainFunc(elapsed)
  } catch (error) {
    failCallback(error)
  }

  if (elapsed <= timer.duration) {
    requestAnimationFrame(() => {
      runFrame(mainFunc, successCallback, failCallback)
    })
  } else {
    successCallback()
  }
}

const animation = (duration:number = 0, mainFunc: any, option: Option = {}) => {
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
  }, (error: any) => {
    if (typeof config.failCallback === 'function') {
      config.failCallback()
    }
  })
}



export {
  animation
}