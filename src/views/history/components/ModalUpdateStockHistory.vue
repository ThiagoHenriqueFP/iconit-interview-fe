<script setup lang="ts">
import { ref } from 'vue';
import ModalBase from '../../../components/ModalBase.vue';
import { useToast } from 'vue-toast-notification';
import type { ModalType } from '../../../domain/entities/modal-type';
import { UpdateStockHistory } from '../../../domain/services/stockHistory/put-stock-history';
const props = defineProps<{
  id: number
  open: boolean
  type: ModalType
}>()

const amount = ref('')
const price = ref('')
const movement = ref<'IN' | 'OUT'>('OUT')

async function updateProduct() {
  try {
    await UpdateStockHistory.instance.perform(
      props.id,
      {
        movement: movement.value,
        sellQuantity: Number.parseInt(amount.value),
        sellValue: Number.parseFloat(price.value)
      }
    )
    useToast().success("history updated!")
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  }
}
</script>

<template>
  <ModalBase :is-open="props.open" :type="props.type">
    <template #header>
      <h1>Update stock history</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 *:border *:border-gray-500 *:rounded-md *:p-2">
        <input placeholder="quantity to add" type="number" v-model="amount" />
        <input placeholder="sell price" type="number" v-model="price" class="" />
        <select name="movemnt" v-model="movement">
          <option value="IN">In</option>
          <option value="OU">Out</option>
        </select>
        <button class="bg-orange-400 hover:bg-orange-400/60 !text-sm m-auto" @click="updateProduct">Update</button>
      </div>
    </template>
  </ModalBase>
</template>