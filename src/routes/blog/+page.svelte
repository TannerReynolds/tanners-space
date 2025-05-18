<script>
	import { t } from '$lib/stores/locale';

	export let data;

	let selectedCategory = '';

	function selectCategory(cat) {
		selectedCategory = cat;
	}

	const localizeCategory = (name) => {
		const key = `blog.category.${name.toLowerCase()}`;
		const translation = $t(key);
		return translation === key ? name : translation;
	};

	// Filter posts by selected category
	$: filteredPosts = selectedCategory
		? data.posts.filter((p) => p.category === selectedCategory)
		: data.posts;
</script>

<div style="height: 30px"></div>
<!-- Category Filter Bar -->
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

<!-- Blog Post Cards -->
<div class="space-y-8">
	{#each filteredPosts as post}
		<article class="card bg-base-200 mx-50 my-8 shadow-lg">
			<div class="card-body">
				<div class="text-base-content/70 mb-2 text-sm">{post.date}</div>
				<h2 class="card-title hover:text-primary text-xl font-bold transition-colors">
					<a href={post.slug}>{post.title}</a>
				</h2>
				<p class="my-3">{post.preview}</p>
				<div class="card-actions justify-end">
					<a href={post.slug} class="btn btn-ghost btn-sm">Read More</a>
				</div>
			</div>
		</article>
	{/each}
</div>
