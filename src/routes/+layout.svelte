<!-- +layout.svelte -->
<script lang="js">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { loadGalleryImages } from '$lib/utils/loadGalleryImages.js';

	export let data;

	let allImages = [];

	onMount(async () => {
		allImages = await loadGalleryImages();
	});
</script>

<svelte:head>
	{#each data.allImages as img}
		<link rel="preload" as="image" href={img} />
	{/each}
</svelte:head>
<Navbar />
<slot />
