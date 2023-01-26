<template>
  <div>
    <div>seo-route = {{ initialPath }}</div>
  </div>
</template>

<script setup lang="ts">
// get the slug from the route
const {
  params: { slug },
} = useRoute();

const initialPath = slug
  ? Array.isArray(slug)
    ? `/${slug.join("/")}`
    : slug
  : "/";
</script>
