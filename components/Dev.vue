<template>
  <div
    class="absolute top-0 right-0 z-20 bg-white"
    :class="{ 'z-40': devComponentVisible }"
  >
    <div>
      <button
        class="p-2 text-gray-800 hover:text-yellow-500"
        @click="devComponentVisible = !devComponentVisible"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-6 w-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="devComponentVisible"
      class="fixed top-1/2 left-1/2 z-20 flex h-4/5 w-full max-w-4xl -translate-y-1/2 -translate-x-1/2 transform flex-col rounded-lg border bg-white shadow"
    >
      <div class="flex p-4 text-gray-800">
        <div>
          <h2 class="text-lg font-bold">Component Info</h2>
          <p>
            This
            <span :class="{ 'font-bold ': componentName }">{{
              componentName || "component"
            }}</span>
            has access to the following data:
          </p>
        </div>

        <button
          class="ml-auto h-10 w-10 rounded-full p-2 hover:bg-gray-200"
          @click="devComponentVisible = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="mx-4 mt-4 rounded-t text-sm text-gray-800">
        <button
          class="rounded-t p-2 font-bold capitalize text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'page',
            'bg-gray-600 ': activeItem !== 'page',
          }"
          @click="activeItem = 'page'"
        >
          {{ componentName }} Data
        </button>

        <button
          v-if="dataset && isContentProjection"
          class="rounded-t p-2 font-bold text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'dataset',
            'bg-gray-600 ': activeItem !== 'dataset',
          }"
          @click="activeItem = 'dataset'"
        >
          Current Dataset
        </button>

        <button
          v-if="products"
          class="rounded-t p-2 font-bold text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'products',
            'bg-gray-600 ': activeItem !== 'products',
          }"
          @click="activeItem = 'products'"
        >
          Products
        </button>
      </div>

      <div
        class="mx-4 mb-4 flex-1 overflow-scroll rounded-b rounded-tr bg-gray-800 p-4 text-sm text-white"
      >
        <pre>{{ devContent }}</pre>
      </div>
    </div>

    <div
      v-if="devComponentVisible"
      class="fixed inset-0 z-10 bg-black bg-opacity-50"
      @click="devComponentVisible = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Dataset } from "fsxa-api";

const props = defineProps<{
  content: unknown;
  dataset?: Dataset | null;
  componentName?: string;
}>();

const { activeNavigationItem } = useNavigationData();
const { findCachedProductsByRoute } = useContent();

const devComponentVisible = ref(false);

const activeItem = ref<"page" | "dataset" | "products">("page");

const devContent = computed(() => {
  if (activeItem.value === "dataset") {
    return props.dataset;
  } else if (activeItem.value === "products") {
    return products.value;
  } else return props.content;
});

const products = computed(() => findCachedProductsByRoute(useRoute().path));

const isContentProjection = computed(
  () => activeNavigationItem.value?.seoRouteRegex !== null
);
</script>
