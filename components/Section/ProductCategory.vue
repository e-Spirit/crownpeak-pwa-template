<template>
  <div data-testid="productCategorySection">
    <div v-if="!pending" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        class="h-40"
        :to="product.route"
      >
        <div class="relative h-40 overflow-hidden">
          <div
            class="absolute inset-0 z-10 transform bg-black bg-opacity-70 p-8 text-white opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
          >
            <h3 class="text-lg font-bold">{{ product.data["tt_name"] }}</h3>
            <p class="h-16 overflow-hidden text-xs text-gray-200">
              {{ product.data["tt_abstract"]?.substring(0, 45) }}...
            </p>
          </div>
          <ElementsImage
            v-if="product.data['tt_teaser_image']"
            class="absolute top-0 left-0 h-40 w-full object-cover"
            :image="product.data['tt_teaser_image']"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComparisonQueryOperatorEnum, DataEntries, Dataset } from "fsxa-api";
const props = defineProps<{ data: DataEntries }>();
const { $fsxaApi } = useNuxtApp();
const { activeLocale } = useLocale();

const { data: products, pending } = useAsyncData(async () => {
  const filterParams = props.data["filterParams"];
  const categoryFilter = filterParams?.category
    ? [
        {
          field: "formData.tt_categories.value.identifier",
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: filterParams.category,
        },
      ]
    : [];
  const { items } = await $fsxaApi.fetchByFilter({
    filters: [
      {
        field: "entityType",
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: "product",
      },
      {
        field: "schema",
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: "products",
      },
      ...categoryFilter,
    ],
    locale: activeLocale.value,
    pagesize: 10,
  });
  return items as Dataset[];
});
</script>
