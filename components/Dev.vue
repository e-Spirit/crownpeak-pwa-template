<template>
  <DevOnly>
    <div class="absolute">
      <div>
        <button
          class="border p-2 bg-white hover:bg-blue-200"
          @click="devComponentVisible = !devComponentVisible"
        >
          Show Dev
        </button>
      </div>

      <div
        v-if="devComponentVisible"
        class="fixed h-96 top-10 w-full max-w-lg mx-auto border shadow z-20"
      >
        <div class="bg-white p-4">
          <button @click="devComponentVisible = false">Close</button>
        </div>
        <div class="bg-gray-800 text-white p-4 overflow-scroll h-96">
          <pre>{{ content }}</pre>
        </div>
      </div>

      <div
        v-if="devComponentVisible"
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
        @click="devComponentVisible = false"
      ></div>

      <!--  -->
    </div>
  </DevOnly>
</template>

<script setup lang="ts">
import { PageBodyContent } from "fsxa-api/dist/types";
defineProps<{ content: PageBodyContent }>();

const devComponentVisible = ref(false);
</script>
