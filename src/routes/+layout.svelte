<!-- +layout.svelte -->
<script lang="js">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;
</script>

<svelte:head></svelte:head>
<Navbar />
<slot />
