<template>
  <DevOnly>
    <div class="absolute">
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
        class="fixed top-10 z-20 mx-auto h-96 w-full max-w-lg border shadow"
      >
        <div class="bg-white p-4">
          <button @click="devComponentVisible = false">Close</button>
        </div>
        <div class="h-96 overflow-scroll bg-gray-800 p-4 text-white">
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
import { PageBodyContent } from "fsxa-api";
defineProps<{ content: PageBodyContent }>();

const devComponentVisible = ref(false);
</script>
