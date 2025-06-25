<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue';
import ProductCard from './components/ProductCard.vue'
import type { GetProduct } from '../../domain/entities/product/get-product';
import { GetproductService } from '../../domain/services/product/get-producs';
import { useToast } from 'vue-toast-notification';

const products: Ref<GetProduct[]> = ref([])
const loading: Ref<boolean> = ref(true)

async function getProducts() {
  loading.value = true
  try {
    const response = await GetproductService.instance.perform()
    products.value = response
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <h1 class="font-semibold text-blue-800 mb-8">Products</h1>
  <h2 class="font-semibold mb-4">Stored Products</h2>
  <div v-if="loading" class="flex gap-4 items-center justify-center">
    <span>fethcing data...</span>
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
  </div>
  <div v-if="products.length > 0">
    <ul v-for="product in products" :key="product.code" class="*:mb-2">
      <li>
        <ProductCard
        :code="product.code"
        :description="product.description" 
        :quantitiy="product.stockQuantity"
        :type="product.type" />
      </li>
    </ul>
  </div>
  <div v-if="products.length == 0 && !loading">
    <span>No products found</span>
  </div>
</template>