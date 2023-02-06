<template>
  <DevOnly>
    <div
      class="absolute top-0 right-0 z-20"
      :class="{ 'z-40': devComponentVisible }"
    >
      <div>
        <button
          class="border bg-white p-2 hover:bg-blue-200"
          @click="devComponentVisible = !devComponentVisible"
        >
          Show Dev
        </button>
      </div>

      <div
        v-if="devComponentVisible"
        class="fixed top-1/2 left-1/2 z-20 h-4/5 w-full max-w-4xl -translate-y-1/2 -translate-x-1/2 transform border shadow"
      >
        <div class="bg-white p-4">
          <button @click="devComponentVisible = false">Close</button>
        </div>
        <div class="h-full overflow-scroll bg-gray-800 p-4 text-white">
          <pre>{{ content }}</pre>
        </div>
      </div>

      <div
        v-if="devComponentVisible"
        class="fixed inset-0 z-10 bg-black bg-opacity-50"
        @click="devComponentVisible = false"
      ></div>

      <!--  -->
    </div>
  </DevOnly>
</template>

<script setup lang="ts">
defineProps<{
  content: unknown;
}>();

const devComponentVisible = ref(false);
</script>
