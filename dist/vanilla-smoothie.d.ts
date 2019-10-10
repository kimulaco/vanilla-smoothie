declare type VanillaSmoothieTarget = string | number;
declare type VanillaSmoothieCallbak = () => void;
interface VanillaSmoothieOption {
    element?: HTMLElement;
    easing?: string;
    duration?: number;
    adjust?: number;
}
interface VanillaSmoothieInstance {
    onPopstate: (hash: string) => void;
    scrollTo: (target: VanillaSmoothieTarget, option: VanillaSmoothieOption, callback: VanillaSmoothieCallbak) => Promise<void>;
    scrollTop: (option: VanillaSmoothieOption, callback: VanillaSmoothieCallbak) => Promise<void>;
    scrollBottom: (option: VanillaSmoothieOption, callback: VanillaSmoothieCallbak) => Promise<void>;
}
declare const vanillaSmoothie: VanillaSmoothieInstance;
export default vanillaSmoothie;
