<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue';
import ProductCard from './components/ProductCard.vue'
import Loading from '../../components/Loading.vue';
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
  <Loading :loading="loading" />
  <div v-if="products.length > 0">
    <ul v-for="product in products" :key="product.code" class="*:mb-2">
      <li>
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
  <div v-if="products.length == 0 && !loading">
    <span>No products found</span>
  </div>
</template>