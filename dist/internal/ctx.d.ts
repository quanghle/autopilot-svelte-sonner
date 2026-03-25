import { SonnerState } from '../toast-state.svelte.js';
declare class Context<T> {
    #private;
    constructor(name: string);
    exists(): boolean;
    get(): T;
    set(context: T): T;
}
export declare const richColorsContext: Context<{
    setRichColors: (value: boolean) => void;
}>;
export declare const sonnerContext: Context<SonnerState>;
export {};
