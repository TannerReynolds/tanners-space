<!-- +layout.svelte -->
<script lang="js">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	export let data;

	import { onMount } from 'svelte';

	onMount(() => {
		for (const url of data.allImages) {
			const img = new Image();
			img.src = url;
		}
	});
</script>
<svelte:head>
	{#each data.allImages as img}
		<link rel="preload" as="image" href={img} />
	{/each}
</svelte:head>
<Navbar />
<slot />
