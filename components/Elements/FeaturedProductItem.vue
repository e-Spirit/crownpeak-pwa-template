<template>
  <div
    v-if="product.data['tt_teaser_image']"
    class="relative z-0 w-full sm:w-[300px] lg:w-[300px] xl:w-[360px]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <img :src="imageSource" :alt="product.data.tt_name" />

    <NuxtLink :to="product.route">
      <div
        class="absolute top-0 z-20 h-full p-4 text-white lg:p-8"
        :class="{ [`bg-black/75`]: hover, [`bg-black/50`]: !hover }"
      >
        <h3 class="mt-4 border-b-2 text-2xl font-black text-yellow-500">
          {{ product.data.tt_name }}
        </h3>
        <p>
          {{ product.data.tt_abstract }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import { DataEntry } from 'fsxa-api/dist/types'
import { ref } from 'vue'
defineProps<{ product: DataEntry; imageSource?: string }>()
const hover = ref(false)
</script>
