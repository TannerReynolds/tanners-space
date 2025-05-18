<script>
	export let data;
</script>

<div style="height: 30px"></div>
<main class="prose max-w-none mx-5 p-6 md:mx-50 bg-base-200 rounded-xl">
	<h1 class="text-3xl font-bold mb-2">{data.title}</h1>
	{#if data.date}
		<p class="text-sm text-base-content/70 mb-4">{data.date}</p>
	{/if}
	{@html data.html}
</main>