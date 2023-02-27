<template>
  <div class="w-full border-t py-12 text-sm" data-testid="footer">
    <div
      class="container mx-auto grid items-center gap-6 p-4 md:grid-cols-3 md:gap-2 md:p-0"
    >
      <div>
        <NuxtLink to="/"
          ><ElementsImage
            v-if="projectProperties?.data && projectProperties?.data['ps_logo']"
            data-testid="logo"
            class="w-30 h-12 object-contain"
            :image="projectProperties?.data['ps_logo']"
        /></NuxtLink>
      </div>
      <div class="md:text-center" data-testid="copyright">
        © {{ projectProperties?.data["ps_footer"]["gc_copyright"] }}
      </div>
      <div class="space-x-2 md:text-right" data-testid="legal-links">
        <NuxtLink class="hover:underline" to="/impressum">Impressum</NuxtLink>
        <NuxtLink class="hover:underline" to="/datenschutz"
          >Datenschutzerklärung</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { projectProperties } = useProjectProperties();
</script>
