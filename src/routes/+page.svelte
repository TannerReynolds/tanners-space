<script>
  import { onMount } from 'svelte'
  import { t } from '$lib/stores/locale'
  import { getDomainAvatar } from '$lib/utils/domain-avatar'

  let avatar = ''
  let styledLinks = []

  const semanticColors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    //'bg-neutral',
    //'bg-info',
    //'bg-success',
    //'bg-warning',
    //'bg-error'
  ]

  const links = [
    { href: 'https://cdn.tokyo.jp', icon: 'CDN.svg', key: 'link.cdn' },
    { href: 'https://anime.tokyo.jp', icon: 'Anime.svg', key: 'link.anime' },
    { href: '/tab', icon: 'Tab.svg', key: 'link.tab' },
    { href: 'https://github.com/TannerReynolds', icon: 'Github.svg', key: 'link.github' },
    { href: 'https://instagram.com/tanscend', icon: 'Instagram.svg', key: 'link.instagram' },
    { href: 'https://discord.gg/cars', icon: 'Discord.svg', key: 'link.discord' },
  ]

  function randomClass() {
    return semanticColors[Math.floor(Math.random() * semanticColors.length)]
  }

  onMount(() => {
    avatar = getDomainAvatar()
    styledLinks = links.map(link => ({ ...link, color: randomClass() }))
  })
</script>

<section class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-8 p-8">
  <img src={avatar} alt="avatar" class="w-32 h-32 rounded-full shadow-lg transition-all duration-300 hover:scale-105" />
  <div class="grid gap-4">
    {#each styledLinks as { href, icon, key, color }}
      <a class={`btn btn-lg text-base-100 ${color} flex items-center gap-2 justify-start w-64 mx-auto`} href={href} target="_blank">
        <img src={`/${icon}`} alt={icon} class="w-5 h-5" />
        <span>{$t(key)}</span>
      </a>
    {/each}
  </div>
</section>