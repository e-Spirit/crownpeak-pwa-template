<template>
  <div class="my-10 flex flex-col items-center">
    <button
      class="flex w-fit items-center space-x-2 border border-black px-4 py-2 font-medium hover:bg-gray-50"
      :onclick="() => $createSection(bodyName)"
    >
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
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>

      <span>Add Section</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ bodyName: string }>()
</script>
