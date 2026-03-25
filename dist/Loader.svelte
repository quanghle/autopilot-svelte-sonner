<script lang="ts" module>
	const bars = Array(12).fill(0);
</script>

<script lang="ts">
	import { cn } from './internal/helpers.js';

	let { visible, class: className }: { visible: boolean; class?: string } =
		$props();
</script>

<div
	class={cn('sonner-loading-wrapper', className)}
	data-visible={visible}
>
	<div class="sonner-spinner">
		{#each bars as _, i (`spinner-bar-${i}`)}
			<div class="sonner-loading-bar"></div>
		{/each}
	</div>
</div>
