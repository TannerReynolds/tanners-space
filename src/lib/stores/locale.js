import { writable, derived } from 'svelte/store';
import en from '$lib/locales/en.json';
import ja from '$lib/locales/ja.json';

export const locale = writable('en');

const translations = { en, ja };

export const t = derived(locale, ($locale) => {
	return (key) => translations[$locale]?.[key] ?? key;
});
