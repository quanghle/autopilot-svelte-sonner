<script lang="ts">
	import { Toaster, toast } from '$lib/index.js';

	function addTopRight() {
		toast.success('Top right toast', { position: 'top-right' });
	}

	function addBottomLeft() {
		toast.error('Bottom left toast', { position: 'bottom-left' });
	}

	function addMultiple() {
		toast.success('Top right #1', { position: 'top-right', duration: 60000 });
		toast.info('Top right #2', { position: 'top-right', duration: 60000 });
		toast.warning('Top right #3', { position: 'top-right', duration: 60000 });
		toast.error('Bottom left #1', { position: 'bottom-left', duration: 60000 });
		toast.success('Bottom left #2', { position: 'bottom-left', duration: 60000 });
		toast('Bottom left #3', { position: 'bottom-left', duration: 60000 });
	}
</script>

<Toaster expand={false} />

<div style="display: flex; flex-direction: column; gap: 10px; padding: 50px;">
	<h1>Multi-Position Toast Bug Demo</h1>
	<p>Click "Add Multiple" then hover over one position group. Notice both groups expand (BUG).</p>
	<button onclick={addTopRight}>Add Top Right Toast</button>
	<button onclick={addBottomLeft}>Add Bottom Left Toast</button>
	<button onclick={addMultiple} id="add-multiple">Add Multiple (both positions)</button>
</div>
