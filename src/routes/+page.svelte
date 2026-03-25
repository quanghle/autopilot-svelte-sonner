<script lang="ts">
	import { Toaster } from '$lib/index.js';
	import Expand from '../components/Expand.svelte';
	import Footer from '../components/Footer.svelte';
	import Hero from '../components/Hero.svelte';
	import Installation from '../components/Installation.svelte';
	import Other from '../components/Other.svelte';
	import Position from '../components/Position.svelte';
	import Types from '../components/Types.svelte';
	import Usage from '../components/Usage.svelte';
	import { richColorsContext } from '$lib/internal/ctx.js';
	import { base } from '$app/paths';

	let expand = $state(false);

	let richColors = $state(false);
	let closeButton = $state(false);

	richColorsContext.set({
		setRichColors: (value: boolean) => (richColors = value)
	});
</script>

<svelte:head>
	<title>Autopilot Svelte Sonner</title>
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta
		name="description"
		content="An opinionated toast component for Svelte."
	/>
	<meta name="keywords" content="svelte, toast, notification, web" />
	<meta name="author" content="Robert Soriano" />
	<meta name="og:title" content="Autopilot Svelte Sonner" />
	<meta
		name="og:description"
		content="An opinionated toast component for Svelte."
	/>
	<meta property="og:site_name" content="Autopilot Svelte Sonner" />
	<meta property="og:url" content="https://quanghle.github.io/autopilot-svelte-sonner" />
	<meta
		property="og:image"
		content="https://og-image.vercel.app/Autopilot%20Svelte%20Sonner"
	/>
	<link rel="icon" href="{base}/favicon.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@quanghle" />
	<meta
		name="twitter:description"
		content="An opinionated toast component for Svelte."
	/>
	<meta name="twitter:title" content="Autopilot Svelte Sonner" />
	<meta
		name="twitter:image"
		content="https://og-image.vercel.app/Autopilot%20Svelte%20Sonner"
	/>
</svelte:head>

<Toaster {expand} {richColors} {closeButton} />
<main class="container">
	<Hero />
	<div class="content">
		<Installation />
		<Usage />
		<Types />
		<Position />
		<Expand {expand} setExpand={(exp) => (expand = exp)} />
		<Other
			bind:closeButton
			setRichColors={(value) => (richColors = value)}
		/>
	</div>
</main>
<Footer />
