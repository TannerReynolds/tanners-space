<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/locale';

	export let data;
	let selectedCategory = '';
	let modalOpen = false;
	let currentImage = '';

	const localizeCategory = (name) => {
		const key = `gallery.category.${name.toLowerCase()}`;
		const translation = $t(key);
		return translation === key ? name : translation;
	};

	const filteredImages = () => {
		return selectedCategory
			? data.images.filter((img) => img.category === selectedCategory)
			: data.images;
	};

	const selectCategory = (cat) => {
		selectedCategory = cat === selectedCategory ? '' : cat;
	};
</script>

<div style="height: 30px"></div>
<form class="mb-6 justify-center filter">
	<input class="btn btn-square" type="reset" value="×" on:click={() => (selectedCategory = '')} />
	{#each data.categories as cat}
		<input
			type="radio"
			class="btn"
			name="category"
			aria-label={localizeCategory(cat)}
			checked={cat === selectedCategory}
			on:click={() => selectCategory(cat)}
		/>
	{/each}
</form>

<div class="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4">
	{#each filteredImages() as img}
		<div class="bg-base-200 rounded-lg p-4">
			<img
				src={img.thumb}
				alt="Thumbnail"
        loading="lazy"
				class="cursor-pointer rounded shadow transition hover:scale-102"
				on:click={() => {
					currentImage = img.full;
					modalOpen = true;
				}}
			/>
		</div>
	{/each}
</div>

{#if modalOpen}
	<div class="bg-base-300 bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center">
		<img src={currentImage} class="max-h-[90vh] max-w-[90vw] rounded shadow-lg" />
		<button
			class="btn btn-circle btn-error absolute top-4 right-4"
			on:click={() => (modalOpen = false)}>✕</button
		>
	</div>
{/if}
