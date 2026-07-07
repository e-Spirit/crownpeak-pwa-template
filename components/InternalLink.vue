<template>
  <NuxtLink
    :to="`${navItem.seoRoute}` || '/'"
    class="hover:underline"
    @click="handleClick"
  >
    {{ navItem.label || '??' }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NavigationItem } from 'fsxa-api'
import { getLocaleFromNavigationItem } from '~/utils/fsxa'

const props = defineProps<{
  navItem: NavigationItem
}>()

const { setActiveNavigationItem } = useNavigationData()
const { setActiveLocale } = useLocale()

function handleClick() {
  // Set navigation state immediately before middleware runs
  setActiveNavigationItem(props.navItem)
  // Extract and set locale from navigation item
  try {
    const locale = getLocaleFromNavigationItem(props.navItem)
    setActiveLocale(locale)
  } catch (e) {
    console.warn('[InternalLink] Could not determine locale from nav item:', e)
  }
}
</script>
