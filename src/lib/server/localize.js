import en from '$lib/locales/en.json'
import ja from '$lib/locales/ja.json'

const translations = { en, ja }

export function localize(key, locale = 'en') {
  return translations[locale]?.[key] ?? translations.en?.[key] ?? key
}