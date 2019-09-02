declare type VanillaSmoothieTarget = string | number;
declare type VanillaSmoothieCallbak = () => void;
interface VanillaSmoothieOption {
    element?: HTMLElement;
    easing?: string;
    duration?: number;
    adjust?: number;
}
declare class VanillaSmoothie {
    constructor();
    private cache;
    onPopstate(hash: string): void;
    scrollTo(target: VanillaSmoothieTarget, option: VanillaSmoothieOption | undefined, callback: VanillaSmoothieCallbak): void;
    scrollTop(option: VanillaSmoothieOption, callback: VanillaSmoothieCallbak): void;
    scrollBottom(option: VanillaSmoothieOption, callback: VanillaSmoothieCallbak): void;
    private getScrollOffset;
    private getTargetOffset;
    private getScrollBottomOffset;
}
declare const vanillaSmoothie: VanillaSmoothie;
export default vanillaSmoothie;
