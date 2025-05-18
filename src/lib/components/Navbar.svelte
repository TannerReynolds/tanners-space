<script lang="js">
	import { locale, t } from '$lib/stores/locale';
	import { onMount, afterUpdate } from 'svelte';
	import { themeChange } from 'theme-change';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const switchLocale = () => {
		locale.update((v) => {
			const newLocale = v === 'en' ? 'ja' : 'en';
			localStorage.setItem('locale', newLocale);
			return newLocale;
		});
	};

	onMount(() => {
		const saved = localStorage.getItem('locale');
		if (saved) locale.set(saved);

		themeChange(false);
		alignSlider();
	});

	function alignSlider() {
		const el = tabRefs[activeIndex];
		if (el && slider) {
			slider.style.transform = `translateX(${el.offsetLeft}px)`;
			slider.style.width = `${el.offsetWidth}px`;
		}
	}

	const path = derived(page, ($page) => $page.url.pathname);

	const tabs = [
		{ label: 'Home', href: '/' },
		{ label: 'Gallery', href: '/gallery' },
		{ label: 'Blog', href: '/blog' }
	];

	let tabRefs = [];
	let slider;
	$: activeIndex = tabs.findIndex((tab) => $path === tab.href);

	afterUpdate(() => {
		const el = tabRefs[activeIndex];
		if (el && slider) {
			const { offsetLeft, offsetWidth } = el;
			slider.style.transform = `translateX(${offsetLeft}px)`;
			slider.style.width = `${offsetWidth}px`;
		}
	});
</script>

<!-- NAVBAR -->
<div class="flex justify-center pt-8">
	<div class="bg-base-200 rounded-box flex items-center gap-4 p-4">
		<!-- TABS -->
		<div role="tablist" class="tabs tabs-boxed relative">
			<!-- Animated background "slider" -->
			<div
				class="bg-accent rounded-btn absolute z-0 h-full transition-all duration-300"
				style="width: 0px; transform: translateX(0px); border-radius: 9px;"
				bind:this={slider}
			></div>

			<!-- Tabs -->
			{#each tabs as tab, i}
				<a
					role="tab"
					href={tab.href}
					class="tab text-base-content relative z-10 font-semibold"
					bind:this={tabRefs[i]}
				>
					{$t(`link.${tab.label.toLowerCase()}`)}
				</a>
			{/each}
		</div>

		<!-- CONTROLS -->
		<div class="flex gap-2">
			<button class="btn btn-sm" on:click={switchLocale}>
				<img src={$locale === 'en' ? '/us.svg' : '/jp.svg'} class="h-6 w-6" />
			</button>

			<select class="select select-sm text-center leading-tight" data-choose-theme>
				<option value="coffee">☕ Coffee</option>
				<option value="cupcake">🧁 Cupcake</option>
				<option value="valentine">💖 Valentine</option>
				<option value="night">🌘 Night</option>
				<option value="forest">🌲 Forest</option>
				<option value="black">⚫ OLED</option>
				<option value="luxury">💎 Luxury</option>
				<option value="caramellatte">🧋 Boba Tea</option>
				<option value="retro">💾 Retro</option>
			</select>
		</div>
	</div>
</div>
