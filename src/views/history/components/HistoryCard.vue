<script setup lang="ts">
import type { GetStockHistory } from '../../../domain/entities/stockHistory/get-stock-history';

const props = defineProps<{
  data: GetStockHistory
}>()

const date = new Date(props.data.sellDate)
</script>

<template>
  <div class="p-4 rounded-xl shadow-md mb-4 bg-gray-50">
    <div class="flex justify-between font-semibold">
      <span>{{ props.data.productCode }}</span>
      <span :class="props.data.movement === 'IN' ? 'text-green-500' : 'text-red-500'">{{ props.data.movement
        }}</span>
    </div>

    <div v-if="props.data.movement === 'OUT'" class="flex justify-between mb-4">
      <span>sold {{ props.data.sellQuantity }} items</span>
      <span>value: {{ props.data.sellValue }}</span>
      <span>sell total value: {{ props.data.totalValue }}</span>
    </div>

    <span>{{ date.toLocaleDateString() }}</span>
  </div>
</template>