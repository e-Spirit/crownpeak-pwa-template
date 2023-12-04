<template>
  <div class="group static px-3 py-2 md:relative">
    <button
      class="relative inline-block text-gray-400 group-hover:text-gray-500"
    >
      <ElementsNotificationNumber :amount="favouriteProducts.length" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        ></path>
      </svg>
    </button>
    <div
      class="invisible absolute right-10 z-20 translate-y-0 transform rounded-xl border border-gray-500 bg-white opacity-0 shadow-xl duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100"
    >
      <div
        v-if="favouriteProducts.length > 0"
        class="relative right-0 w-full rounded-xl bg-white p-6 shadow-xl md:w-96"
      >
        <AppLayoutFavouriteProduct
          v-for="product in favouriteProducts"
          :key="product.name"
          :image="product.image"
          :route="product.route"
          :name="product.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { favourites } = useFavourites()
const favouriteProducts = computed(() =>
  favourites.value.map((fav) => ({
    name: fav.product.tt_name,
    route: fav.route,
    image: fav.product.tt_image
  }))
)
</script>

<style scoped></style>
