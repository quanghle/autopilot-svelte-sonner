import { getContext, hasContext, setContext } from 'svelte';
import { SonnerState } from '$lib/toast-state.svelte.js';

class Context<T> {
	#name: string;
	#key: symbol;

	constructor(name: string) {
		this.#name = name;
		this.#key = Symbol(name);
	}

	exists(): boolean {
		return hasContext(this.#key);
	}

	get(): T {
		const context = getContext<T | undefined>(this.#key);
		if (context === undefined) {
			throw new Error(`Context "${this.#name}" not found`);
		}
		return context;
	}

	set(context: T): T {
		return setContext(this.#key, context);
	}
}

export const richColorsContext = new Context<{ setRichColors: (value: boolean) => void }>(
	'richColorsContext'
);

export const sonnerContext = new Context<SonnerState>('<Toaster/>');
