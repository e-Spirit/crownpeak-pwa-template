<template>
  <div>
    <div
      class="absolute -top-10 -z-10 hidden h-4/5 w-3/4 border-[20px] border-gray-100 md:block"
    />
    <div>
      <h2 class="my-4 ml-8 text-4xl uppercase text-gray-400">
        {{ data.st_featured_products_title }}
      </h2>
    </div>
    <div class="grid h-4/5 grid-cols-4 gap-2 bg-red-600 md:pl-8">
      <div
        v-for="product in data.st_featured_products_picture"
        :key="product.id"
      >
        <div v-if="product.data['tt_teaser_image']" class="relative z-0">
          <ElementsImage :image="product.data['tt_teaser_image']" />

          <div class="absolute top-0 z-20 h-full bg-black/50 text-white lg:p-8">
            <h3 class="mt-4 border-b-2 text-2xl font-black text-yellow-500">
              {{ product.data.tt_name }}
            </h3>
            <p>
              {{ product.data.tt_abstract }}
            </p>
            <NuxtLink :to="product.route">
              <div
                class="absolute bottom-8 right-8 w-20 bg-black px-4 py-2 text-center text-white"
              >
                More
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2">
      <h2
        v-if="data.product_recommendations_subtitle"
        class="uppercase text-gray-400"
      >
        {{ data.product_recommendations_subtitle }}
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataEntries } from 'fsxa-api/dist/types'
interface FeaturedProducts {
  product_recommendations_subtitle?: null | string
  st_featured_products_header: string
  st_featured_products_picture: DataEntries
  st_featured_products_title?: null | string
}
defineProps<{ data: FeaturedProducts }>()
</script>
