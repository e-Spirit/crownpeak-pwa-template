<template>
  <NuxtLink
    :to="internalLinkRoute"
    @click="setActiveNavigationItem(linkedNavItem!)"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { InternalLink } from 'types'
const { navigationData, setActiveNavigationItem } = useNavigationData()

const props = defineProps<{ linkData: InternalLink }>()

const linkedNavItem = computed(() => {
  if (!props.linkData) return
  const referenceId: string = props.linkData.data['lt_link']?.referenceId
  if (!referenceId) return
  return navigationData.value?.idMap[referenceId]
})

const internalLinkRoute = computed(() => {
  return linkedNavItem.value?.seoRoute ?? ''
})
</script>
