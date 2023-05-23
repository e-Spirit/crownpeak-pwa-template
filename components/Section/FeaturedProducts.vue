<template>
  <div>
    <div
      class="absolute -top-10 -z-10 hidden h-full w-3/4 border-[20px] border-gray-100 md:block"
    />
    <div class="w-1/3 text-gray-400 sm:px-2 md:px-8">
      <h2
        class="mt-4 ml-4 text-4xl uppercase"
        data-preview-id="#st_featured_products_title"
      >
        {{ data.st_featured_products_title }}
      </h2>
      <h3
        v-if="data.st_featured_products_header"
        class="ml-4"
        data-preview-id="#st_featured_products_header"
      >
        {{ data.st_featured_products_header }}
      </h3>
    </div>
    <div
      class="grid h-4/5 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:pl-8 2xl:grid-cols-4"
    >
      <div
        v-for="(product, index) in data.st_featured_products_picture"
        :key="product.id"
      >
        <ElementsFeaturedProductItem
          :product="product"
          :image-source="imgSrc[index]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataEntry, Image } from 'fsxa-api/dist/types'
interface FeaturedProducts {
  st_featured_products_header: null | string
  st_featured_products_picture: DataEntry[]
  st_featured_products_title?: null | string
}

const props = defineProps<{ data: FeaturedProducts }>()
const imgSrc = computed(() => {
  const images = props.data['st_featured_products_picture'].map(
    (product) => product.data['tt_teaser_image']
  ) as Image[]
  return images.map((image) => {
    const productTeaserIndex = Object.keys(image.resolutions).findIndex(
      (resolutionName) => resolutionName === 'product_teaser'
    )
    if (productTeaserIndex === -1) {
      throw createError(
        'The data contains no image resolution named "product_teaser". Please add one to the dataset.'
      )
    }
    return Object.values(image.resolutions).map((resolution) => resolution.url)[
      productTeaserIndex
    ]
  })
})
</script>
