<script setup lang="ts">
import { ref, type Ref } from 'vue';
import ModalAddToStock from './ModalAddToStock.vue';
import ModalSellProduct from './ModalSellProduct.vue';
import ModalDeleteProduct from './ModalDeleteProduct.vue';
import ModalUpdateProduct from './ModalUpdateProduct.vue';
import type { ModalType } from '../../../domain/entities/modal-type';
import type { GetProduct } from '../../../domain/entities/product/get-product';

const props = defineProps<{
  product: GetProduct
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
</script>

<template>
  <ModalAddToStock :code="props.product.code" :open="openModal.add" type="add" @close="closeAddModal" />
  <ModalSellProduct :code="props.product.code" :open="openModal.sell" type="sell" @close="closeAddModal" />
  <ModalDeleteProduct :code="props.product.code" :open="openModal.delete" type="delete" @close="closeAddModal" />
  <ModalUpdateProduct :code="props.product.code" :open="openModal.update" type="update" @close="closeAddModal" />
  <div class="flex rounded-2xl p-4 shadow-sm bg-gray-50">
    <div class="flex flex-col">
      <span class="font-semibold">{{ props.product.code }}</span>
      <span>{{ props.product.description }}</span>
    </div>
    <div class="flex flex-col ml-auto mr-10">
      <span class="ml-auto text-xs">{{ props.product.type?.replace('_', ' ') }}</span>
      <span class="ml-auto text-xs"><span class="font-semibold">{{ props.product.stockQuantity }}</span> in stock</span>
      <span class="ml-auto text-xs"><span class="font-semibold">{{ props.product.totalAmountSold }}</span> solded</span>
      <span class="ml-auto text-xs"><span class="font-semibold">{{ props.product.totalValueSold.toFixed(2) }}</span> value solded</span>
      <span class="ml-auto text-xs"><span class="font-semibold">{{ props.product.profit.toFixed(2) }}</span> profit</span>
    </div>
    <div class="flex gap-1">
      <button class="max-w-fit bg-blue-500 hover:bg-blue-500/60 text-white font-semibold !text-xs"
        @click="openAddModal('add')">Add to stock</button>
      <button class="max-w-fit bg-amber-700 hover:bg-amber-700/60 text-white font-semibold !text-xs"
        @click="openAddModal('sell')">Sell item</button>
      <button class="max-w-fit bg-orange-400 hover:bg-orange-400/60 text-white font-semibold !text-xs"
        @click="openAddModal('update')">Update
        item</button>
      <button class="max-w-fit bg-red-600/80 hover:bg-red-600/60 text-white font-semibold !text-xs"
        @click="openAddModal('delete')">Remove item</button>
    </div>
  </div>
</template>