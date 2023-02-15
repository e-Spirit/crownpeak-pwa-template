<template>
  <button class="border border-white p-3 capitalize" @click="clickHandler">
    {{ button.data.lt_button_text }}
  </button>
</template>

<script setup lang="ts">
interface Button {
  data: {
    lt_button_text: string;
    lt_product_link: { route: string };
  };
}

const props = defineProps<{ button: Button }>();

function clickHandler() {
  const router = useRouter();
  router.push(props.button.data.lt_product_link.route);
}
</script>
