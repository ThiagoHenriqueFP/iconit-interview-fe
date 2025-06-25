<script setup lang="ts">
import { ref, type Ref } from 'vue';
import ModalAddToStock from './ModalAddToStock.vue';
import ModalSellProduct from './ModalSellProduct.vue';
import ModalDeleteProduct from './ModalDeleteProduct.vue';
import ModalUpdateProduct from './ModalUpdateProduct.vue';
import type { ModalType } from '../../../domain/entities/modal-type';

const props = defineProps({
  code: String,
  type: String,
  description: String,
  quantitiy: Number
})

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
  <ModalAddToStock :code="props.code" :open="openModal.add" type="add" @close="closeAddModal" />
  <ModalSellProduct :code="props.code!" :open="openModal.sell" type="sell" @close="closeAddModal" />
  <ModalDeleteProduct :code="props.code!" :open="openModal.delete" type="delete" @close="closeAddModal" />
  <ModalUpdateProduct :code="props.code!" :open="openModal.update" type="update" @close="closeAddModal" />
  <div class="flex rounded-2xl bg-gray-200 p-4 shadow-sm bg-gray-50">
    <div class="flex flex-col">
      <span class="font-semibold">{{ props.code }}</span>
      <span>{{ props.description }}</span>
    </div>
    <div class="flex flex-col ml-auto mr-10">
      <span class="ml-auto text-xs">{{ props.type?.replace('_', ' ') }}</span>
      <span class="ml-auto text-xs"><span class="font-semibold">{{ props.quantitiy }}</span> in stock</span>
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