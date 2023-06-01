<template>
  <div class="w-full border-t py-12 text-sm text-gray-800" data-testid="footer">
    <div
      class="container mx-auto grid items-center gap-6 p-4 md:grid-cols-3 md:gap-2 md:p-0"
    >
      <div>
        <NuxtLink to="/"><AppLayoutLogo /></NuxtLink>
      </div>
      <div class="md:text-center" data-testid="copyright">
        © {{ state.projectProperties?.data['ps_footer']['gc_copyright'] }}
      </div>
      <div class="space-x-2 md:text-right" data-testid="legal-links">
        <NuxtLink
          v-for="link of state.legalLinks"
          :key="link.name"
          class="hover:underline"
          :to="link.route"
          >{{ link.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProjectProperties } from 'fsxa-api/dist/types'
const { fetchProjectProperties, setProjectProperties } = useProjectProperties()
const { activeLocale } = useLocale()

interface LegalLink {
  name: string
  route: string
}

const getLegalLinks = (
  projectProperties: ProjectProperties | null
): LegalLink[] =>
  projectProperties?.data['ps_footer'].gc_linklist.map((link) => ({
    name: link.data.lt_text,
    route: '/' + link.data.lt_text.replaceAll(' ', '-')
  }))
const projectProperties = await fetchProjectProperties(activeLocale!.value!)
const state = reactive({
  projectProperties,
  legalLinks: getLegalLinks(projectProperties)
})

watch(activeLocale, async (newLocale) => {
  const newProjectProperties = await fetchProjectProperties(newLocale!)
  setProjectProperties(newProjectProperties!, newLocale!)

  state.legalLinks = getLegalLinks(newProjectProperties)
  state.projectProperties = newProjectProperties
})
</script>
