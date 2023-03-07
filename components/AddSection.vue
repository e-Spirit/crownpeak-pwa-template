<template>
  <div
    v-if="mode === FSXAContentMode.PREVIEW"
    class="flex flex-col items-center"
  >
    <button
      class="w-fit border border-black px-4 py-2 font-medium"
      :onclick="() => $createSection(bodyName)"
    >
      Add Section
    </button>
  </div>
</template>

<script setup lang="ts">
import { FSXAContentMode } from "fsxa-api";

defineProps<{ bodyName: string }>();

const {
  public: { mode },
} = useRuntimeConfig();
</script>
