<script setup lang="ts">
import ModalBase from '../../../components/ModalBase.vue';
import { useToast } from 'vue-toast-notification';
import type { ModalType } from '../../../domain/entities/modal-type';
import { DeleteStockHistory } from '../../../domain/services/stockHistory/delete-stock-history';
const props = defineProps<{
  id: number
  open: boolean
  type: ModalType
}>()

async function updateProduct() {
  try {
    await DeleteStockHistory.instance.perform(
      props.id,
    )
    useToast().success("history marked as canceled!")
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  }
}
</script>

<template>
  <ModalBase :is-open="props.open" :type="props.type">
    <template #header>
      <h1>Delete from stock history</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 *:border *:border-gray-500 *:rounded-md *:p-2">
        <h2 class="text-2xl font font-semibold">Do you want to cancel this transaction?</h2>
        <span class="text-sm">This will make the transaction as canceled and the values will be reseted</span>
        <button class="bg-red-500 hover:bg-red-500/60 !text-sm m-auto" @click="updateProduct">Delete</button>
      </div>
    </template>
  </ModalBase>
</template>