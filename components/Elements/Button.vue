<template>
  <button
    class="border border-white p-3 capitalize hover:bg-gray-800"
    @click="clickHandler"
  >
    {{ button.data.lt_button_text }}
  </button>
</template>

<script setup lang="ts">
interface Button {
  data: {
    lt_button_text: string
    lt_product_link?: { route: string }
    lt_internal?: {
      referenceId: string
    }
  }
}

const props = defineProps<{ button: Button }>()

const { navigationData } = useNavigationData()

function clickHandler() {
  const router = useRouter()

  // product link
  if (props.button.data.lt_product_link) {
    router.push(props.button.data.lt_product_link.route)
  }
  // internal link
  if (props.button.data.lt_internal) {
    const referenceId = props.button.data.lt_internal.referenceId
    const linkedNavItem = navigationData.value?.idMap[referenceId]
    const route = linkedNavItem?.seoRoute ?? ''
    if (route) router.push(route)
  }
}
</script>
