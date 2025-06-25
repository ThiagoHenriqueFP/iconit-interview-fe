<script setup lang="ts">
import { ref } from 'vue';
import ModalBase from '../../../components/ModalBase.vue';
import { AddToStockService } from '../../../domain/services/stockHistoryProduct/add-to-stock';
import { useToast } from 'vue-toast-notification';
import type { ModalType } from '../../../domain/entities/modal-type';
const props = defineProps<{
  code: string
  open: boolean
  type: ModalType
}>()

const amount = ref('')
const price = ref('')

async function addToStock(){
  try {
    await AddToStockService.instance.perform(props.code, Number.parseInt(amount.value), Number.parseInt(price.value) || undefined)
    useToast().success("product added to stock!")
  } catch (err) {
    if (err instanceof Error)
    useToast().error(err.message)
  }
}
</script>

<template>
  <ModalBase :is-open="props.open" :type="props.type" >
    <template #header>
      <h1>Add Item to stock</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 *:border *:border-gray-500 *:rounded-md *:p-2">
        <input placeholder="quantity to add" type="number" v-model="amount" />
        <input placeholder="supplier price" type="number" v-model="price"  class="mb-2 1"/>
        <button class="bg-blue-500 hover:bg-blue-500/60 !text-sm m-auto" @click="addToStock">Add</button>
      </div>
    </template>
  </ModalBase>
</template>