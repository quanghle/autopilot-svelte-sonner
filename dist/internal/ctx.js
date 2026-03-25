import { getContext, hasContext, setContext } from 'svelte';
import { SonnerState } from '../toast-state.svelte.js';
class Context {
    #name;
    #key;
    constructor(name) {
        this.#name = name;
        this.#key = Symbol(name);
    }
    exists() {
        return hasContext(this.#key);
    }
    get() {
        const context = getContext(this.#key);
        if (context === undefined) {
            throw new Error(`Context "${this.#name}" not found`);
        }
        return context;
    }
    set(context) {
        return setContext(this.#key, context);
    }
}
export const richColorsContext = new Context('richColorsContext');
export const sonnerContext = new Context('<Toaster/>');
