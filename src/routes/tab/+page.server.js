import { localize } from '$lib/server/localize'

export function load({ url }) {
  const locale = url.searchParams.get('lang') || 'en'
  return {
    message: localize('link.tab', locale)
  }
}