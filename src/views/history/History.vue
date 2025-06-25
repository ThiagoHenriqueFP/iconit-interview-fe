<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Loading from '../../components/Loading.vue';
import { GetStockHistoryService } from '../../domain/services/stockHistory/get-stock-history';
import { type ProductType } from '../../domain/entities/product-type';
import { type GetStockHistory } from '../../domain/entities/stockHistory/get-stock-history';
import { useToast } from 'vue-toast-notification';
import HistoryCard from './components/HistoryCard.vue';

const type = ref<ProductType>('all')
const data = ref<GetStockHistory[]>([])
const loading = ref(false)

async function getHistory() {
  try {
    loading.value = true
    const response = await GetStockHistoryService.instance.perform(type.value)
    data.value = response
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getHistory()
})


watch(() => type.value, (old, newVal) => {
  getHistory()
})

function handleChangeType(change: ProductType) {
  type.value = change
}

</script>

<template>
  <h1 class="font-bold mb-8 text-blue-800">History</h1>
  <h2 class="font-semibold mb-4">Stock Movement</h2>
  <div>
    <div class="ml-auto w-fit mb-4 *:ml-2">
      <button @click="() => handleChangeType('all')">All</button>
      <button @click="() => handleChangeType('electronic')">Electronics</button>
      <button @click="() => handleChangeType('house_appliance')">House Appliance</button>
      <button @click="() => handleChangeType('furniture')">Furniture</button>
    </div>
    <div class="flex flex-col">
      <span v-if="data.length == 0 && !loading" class="text-3xl font-semibold mt-8 mx-auto" >No data found!</span>
      <Loading :loading="loading" />
      <ul v-for="d in data" :key="d.id">
        <li>
          <HistoryCard :data="d" />
        </li>
      </ul>
    </div>
  </div>
</template>