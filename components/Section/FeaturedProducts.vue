<template>
  <div>
    <div
      class="absolute -top-10 -z-10 hidden h-full w-3/4 border-[20px] border-gray-100 md:block"
    />
    <div class="w-1/3 text-gray-400 sm:px-2 md:px-8">
      <h2
        class="ml-4 mt-4 text-4xl uppercase"
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
          :image-source="productImageSources[index]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DataEntry, Image } from 'fsxa-api'
interface FeaturedProducts {
  st_featured_products_header: null | string
  st_featured_products_picture: DataEntry[]
  st_featured_products_title?: null | string
}

const props = defineProps<{ data: FeaturedProducts }>()
const productImageSources = computed(() => {
  const resolutionName = 'product_teaser'
  const containsResolution = (
    image: Image,
    resolutionName: string
  ): boolean => {
    return Object.prototype.hasOwnProperty.call(
      image.resolutions,
      resolutionName
    )
  }

  return props.data['st_featured_products_picture'].map((product) => {
    const image = product.data['tt_teaser_image']
    if (!containsResolution(image, resolutionName)) {
      throw createError(
        `The data contains no image resolution named ${resolutionName}. Please add one to the dataset.`
      )
    }
    return image.resolutions[resolutionName]!.url
  })
})
</script>
