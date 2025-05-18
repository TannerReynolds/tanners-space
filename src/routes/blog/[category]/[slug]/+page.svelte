<script>
	export let data;
</script>

<div style="height: 30px"></div>
<main class="prose bg-base-200 mx-5 max-w-none rounded-xl p-6 md:mx-50">
	<h1 class="mb-2 text-3xl font-bold">{data.title}</h1>
	{#if data.date}
		<p class="text-base-content/70 mb-4 text-sm">{data.date}</p>
	{/if}
	{@html data.html}
</main>
