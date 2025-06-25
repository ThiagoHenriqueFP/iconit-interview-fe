<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue';
import ProductCard from './components/ProductCard.vue'
import Loading from '../../components/Loading.vue';
import type { GetProduct } from '../../domain/entities/product/get-product';
import { GetproductService } from '../../domain/services/product/get-producs';
import { useToast } from 'vue-toast-notification';
import ModalAddProduct from './components/ModalAddProduct.vue';

const products: Ref<GetProduct[]> = ref([])
const loading: Ref<boolean> = ref(true)
const showModal = ref(false)

function handleOpenModal() {
  showModal.value = true
}

function handleCloseModal() {
  showModal.value = false
}

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
  <ModalAddProduct :open="showModal" :refetch="getProducts" @close="handleCloseModal"/>
  <h1 class="font-semibold text-blue-800 mb-8">Products</h1>
  <h2 class="font-semibold mb-4">Stored Products</h2>
  <Loading :loading="loading" />
  <div v-if="products.length > 0" class="flex flex-col">
    <ul v-for="product in products" :key="product.code" class="*:mb-2">
      <li>
        <ProductCard :product="product" />
      </li>
    </ul>
    <button class="bg-green-500 mx-auto mt-4 text-white" @click="handleOpenModal">Add Product</button>

  </div>
  <div v-if="products.length == 0 && !loading">
    <span>No products found</span>
    <button class="bg-green-500 mx-auto mt-4 text-white" @click="handleOpenModal">Add Product</button>
  </div>
</template>