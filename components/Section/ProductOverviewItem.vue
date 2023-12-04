<template>
  <div class="">
    <div class="mb-24 w-full px-3">
      <div class="mb-9 w-full overflow-hidden rounded-2xl">
        <NuxtLink :to="route">
          <ElementsImage
            v-if="data.tt_image"
            class="w-full"
            :image="data.tt_image"
            :alt="data.tt_image_alt_text"
            ratio="4x3"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="">
      <p
        v-for="category in categories"
        :key="category"
        class="mb-3 text-sm font-medium text-gray-400"
      >
        {{ category }}
      </p>
      <NuxtLink :to="route">
        <h3
          class="mb-4 font-heading text-xl font-medium leading-8 hover:underline"
        >
          {{ data.tt_name }}
        </h3>
      </NuxtLink>
      <p
        class="font-heading text-xl font-medium tracking-tighter text-gray-900"
      >
        {{ data.tt_price }}
      </p>
      <div class="flex flex-wrap items-center">
        <div class="w-1/2 xl:w-2/12">
          <ClientOnly>
            <ElementsLikeButton
              :show-border="false"
              heart-style="ml-auto cursor-pointer text-gray-400 hover:text-gray-500 xl:mx-auto 2xl:mr-0"
              :handler="likeButtonHandler"
              :product="props.data"
              :route="props.route"
            />
          </ClientOnly>
        </div>
        <div class="mt-2 w-1/2 xl:mt-0 xl:w-9/12">
          <div class="lg:mx-auto lg:max-w-max xl:mr-0">
            <NuxtLink :to="route">
              <ElementsArrow class="inline py-px text-gray-400" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductData } from 'types'

const props = defineProps<{ data: ProductData; route: string }>()
const categories = computed(() =>
  props.data.tt_categories.map((category) => category.data['tt_name'])
)
const likeButtonHandler = () => {}
</script>

<style scoped></style>
