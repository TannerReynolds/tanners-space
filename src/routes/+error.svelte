<script>
	export let error;
	export let status;
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
	<h1 class="mb-4 text-5xl font-bold">{status}</h1>
	<p class="text-base-content text-opacity-60">{error?.message || 'Page not found'}</p>
	<a href="/" class="btn btn-primary mt-6">Back to Home</a>
</div>
