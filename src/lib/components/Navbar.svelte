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
		{ label: 'Blog', href: '/blog' },
		{ label: 'Tools', href: '/tools' }
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
<div class="flex justify-center px-4 pt-8">
	<div
		class="bg-base-200 rounded-box flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:flex-nowrap lg:mx-70"
	>
		<!-- Desktop Tabs -->
		<div class="tabs tabs-boxed relative hidden md:flex" role="tablist">
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

		<!-- Mobile Nav -->
		<div class="dropdown md:hidden">
			<label tabindex="0" class="btn btn-sm btn-outline">
				☰ {$t(`link.${tabs[activeIndex]?.label.toLowerCase()}`) || 'Menu'}
			</label>
			<ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
				{#each tabs as tab}
					<li>
						<a href={tab.href}>{$t(`link.${tab.label.toLowerCase()}`)}</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Controls -->
		<div class="ml-auto flex items-center gap-2">
			<button class="btn btn-sm" on:click={switchLocale}>
				<img src={$locale === 'en' ? '/us.svg' : '/jp.svg'} class="h-6 w-6" />
			</button>

			<select class="select select-sm max-w-[8rem] text-center leading-tight" data-choose-theme>
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
