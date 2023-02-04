<template>
  <img :srcset="srcset" :sizes="sizes" :alt="alt" />
</template>

<script lang="ts" setup>
import { Image } from "fsxa-api";
const props = defineProps<{ image: Image; alt?: string }>();

const srcset = computed(() => {
  return Object.values(props.image.resolutions)
    .map((resoloution) => `${resoloution.url} ${resoloution.width}w`)
    .join(", ");
});

const sizes = computed(() => {
  return Object.values(props.image.resolutions)
    .map(
      (resoloution) =>
        `(max-width: ${resoloution.width}px) ${resoloution.width}w`
    )
    .join(", ");
});
</script>
