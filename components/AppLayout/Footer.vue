<template>
  <div class="w-full border-t py-12 text-sm text-gray-800" data-testid="footer">
    <div
      class="container mx-auto grid items-center gap-6 p-4 md:grid-cols-3 md:gap-2 md:p-0"
    >
      <div>
        <NuxtLink to="/"><AppLayoutLogo /></NuxtLink>
      </div>
      <div class="md:text-center" data-testid="copyright">
        © {{ projectProperties?.data['ps_footer']['gc_copyright'] }}
      </div>
      <div class="space-x-2 md:text-right" data-testid="legal-links">
        <NuxtLink class="hover:underline" to="/Impressum">Impressum</NuxtLink>
        <NuxtLink class="hover:underline" to="/Datenschutz"
          >Datenschutzerklärung</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { projectProperties } = useProjectProperties()
</script>
