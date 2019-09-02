declare type MainFunc = (elapsed: number) => void;
declare type SuccessFunc = () => void;
declare type FailFunc = () => void;
interface Option {
    successCallback?: SuccessFunc;
    failCallback?: FailFunc;
}
declare const animation: (duration: number, mainFunc: MainFunc, option?: Option) => void;
export { animation };
