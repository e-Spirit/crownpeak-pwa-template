<template>
  <div class="w-full border-t py-12 text-sm" data-testid="footer">
    <div class="container mx-auto grid grid-cols-3 items-center">
      <div>
        <NuxtLink to="/"
          ><ElementsImage
            v-if="projectProperties?.data && projectProperties?.data['ps_logo']"
            class="w-30 h-12 object-contain"
            :image="projectProperties?.data['ps_logo']"
        /></NuxtLink>
      </div>
      <div class="text-center">
        © {{ projectProperties?.data["ps_footer"]["gc_copyright"] }}
      </div>
      <div class="space-x-2 text-right">
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
