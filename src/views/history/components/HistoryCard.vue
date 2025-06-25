<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { ModalType } from '../../../domain/entities/modal-type';
import type { GetStockHistory } from '../../../domain/entities/stockHistory/get-stock-history';
import ModalUpdateStockHistory from './ModalUpdateStockHistory.vue';
import ModalDeleteStockHistory from './ModalDeleteStockHistory.vue';

const props = defineProps<{
  data: GetStockHistory
}>()

const openModal: Ref<Record<ModalType, boolean>> = ref({
  add: false,
  sell: false,
  delete: false,
  update: false
});

const openAddModal = (key: ModalType): void => {
  openModal.value[key] = true;
};

const closeAddModal = (key: ModalType): void => {
  openModal.value[key] = false;
};

const date = new Date(props.data.sellDate)
</script>

<template>
  <ModalUpdateStockHistory :open="openModal.update" :id="props.data.id" :type="'update'" @close="closeAddModal" />
  <ModalDeleteStockHistory :open="openModal.delete" :id="props.data.id" :type="'delete'" @close="closeAddModal" />
  <div class="p-4 rounded-xl shadow-md mb-4 bg-gray-50">
    <div class="flex justify-between font-semibold">
      <span>{{ props.data.productCode }}</span>
      <span :class="props.data.movement === 'IN' ? 'text-green-500' : 'text-red-500'">
        {{ props.data.movement}}
      </span>
    </div>

    <div v-if="props.data.movement === 'OUT'" class="flex justify-between mb-4">
      <span>sold {{ props.data.sellQuantity }} items</span>
      <span>value: {{ props.data.sellValue }}</span>
      <span>sell total value: {{ props.data.totalValue }}</span>
    </div>

    <div class="flex items-center">
      <span>{{ date.toLocaleDateString() }}</span>
      <div class="ml-auto w-fit flex gap-4">
        <button class="max-w-fit bg-orange-400 hover:bg-orange-400/60 text-white font-semibold !text-xs"
        @click="openAddModal('update')">Update
        item</button>
        <button class="max-w-fit bg-red-600/80 hover:bg-red-600/60 text-white font-semibold !text-xs"
        @click="openAddModal('delete')">Remove item</button>
      </div>
    </div>
  </div>

</template>