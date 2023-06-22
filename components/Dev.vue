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
              componentName || 'component'
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
            'bg-gray-800 ': activeItem === 'content',
            'bg-gray-600 ': activeItem !== 'content'
          }"
          @click="activeItem = 'content'"
        >
          {{ componentName }} Data
        </button>

        <button
          v-if="currentDataset && isContentProjection"
          class="rounded-t p-2 font-bold text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'dataset',
            'bg-gray-600 ': activeItem !== 'dataset'
          }"
          @click="activeItem = 'dataset'"
        >
          Current Dataset
        </button>

        <button
          v-if="products && !isContentProjection"
          class="rounded-t p-2 font-bold text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'products',
            'bg-gray-600 ': activeItem !== 'products'
          }"
          @click="activeItem = 'products'"
        >
          Products
        </button>

        <button
          class="rounded-t p-2 font-bold text-white"
          :class="{
            'bg-gray-800 ': activeItem === 'currentPage',
            'bg-gray-600 ': activeItem !== 'currentPage'
          }"
          @click="activeItem = 'currentPage'"
        >
          Current Page
        </button>
      </div>

      <div
        class="mx-4 mb-4 flex-1 overflow-scroll rounded-b rounded-tr bg-gray-800 p-4 text-sm leading-7 text-white"
      >
        <pre><code  v-html="highglightedDevContent" /></pre>
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
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)

const props = defineProps<{
  content: unknown
  componentName?: string
}>()

const { activeNavigationItem } = useNavigationData()
const {
  findCachedProductsByRoute,
  findCachedPageByRoute,
  findCachedDatasetByRoute
} = useContent()

const devComponentVisible = ref(false)

const activeItem = ref<'content' | 'dataset' | 'products' | 'currentPage'>(
  'content'
)

const devContent = computed(() => {
  if (activeItem.value === 'dataset') {
    return currentDataset.value
  } else if (activeItem.value === 'products') {
    return products.value
  } else if (activeItem.value === 'currentPage') {
    return currentPage.value
  } else return props.content
})

const highglightedDevContent = computed(() => {
  const stringifiedDevContent = JSON.stringify(devContent.value, null, 2)
  return hljs.highlight(stringifiedDevContent, { language: 'json' }).value
})

const products = computed(() => {
  const route = decodeURIComponent(useRoute().path)
  return findCachedProductsByRoute(route)
})

const currentPage = computed(() => {
  const route = decodeURIComponent(useRoute().path)
  return findCachedPageByRoute(route)
})

const currentDataset = computed(() => {
  const route = decodeURIComponent(useRoute().path)
  return findCachedDatasetByRoute(route)
})

const isContentProjection = computed(
  () => activeNavigationItem.value?.seoRouteRegex !== null
)
</script>

<style lang="css">
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #dfdfe0;
  background: #292a2f;
}

.hljs-comment,
.hljs-quote {
  color: #a5b0bd;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #ef81b0;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #dfdfe0;
}

.hljs-literal {
  color: #ef81b0;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
  color: #f08875;
}

.hljs-built_in,
.hljs-class .hljs-title {
  color: #dfdfe0;
}

.hljs-number {
  color: #d5ca86;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo {
  color: #bbf0e4;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #dfdfe0;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
</style>
