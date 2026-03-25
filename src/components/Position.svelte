<script lang="ts">
	import { toast } from '$lib/index.js';
	import CodeBlock from './CodeBlock.svelte';

	const positions = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	] as const;

	type PositionType = (typeof positions)[number];

	let activePosition = $state<PositionType>('bottom-right');
</script>

<div>
	<h2>Position</h2>
	<p>Swipe direction changes depending on the position.</p>
	<div class="buttons">
		{#each positions as pos (pos)}
			<button
				data-active={activePosition === pos}
				class="button"
				onclick={() => {
					activePosition = pos;
					toast('Event has been created', {
						description: 'Monday, January 3rd at 6:00pm',
						position: pos
					});
				}}
			>
				{pos}
			</button>
		{/each}
	</div>
	<CodeBlock code={`toast('Event has been created', { position: "${activePosition}" })`} />
</div>
