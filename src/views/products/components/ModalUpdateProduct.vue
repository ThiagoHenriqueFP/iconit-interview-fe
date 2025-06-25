<script setup lang="ts">
import { ref } from 'vue';
import ModalBase from '../../../components/ModalBase.vue';
import { useToast } from 'vue-toast-notification';
import type { ModalType } from '../../../domain/entities/modal-type';
import { UpdateproductService } from '../../../domain/services/product/update-product';
const props = defineProps<{
  code: string
  open: boolean
  type: ModalType
}>()

const amount = ref('')
const price = ref('')
const description = ref('')
const prodType = ref('')

async function updateProduct() {
  try {
    await UpdateproductService.instance.perform(
      props.code,
      Number.parseInt(amount.value),
      Number.parseInt(price.value),
      description.value,
      Number.parseInt(prodType.value)
    )
    useToast().success("product updated!")
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  }
}
</script>

<template>
  <ModalBase :is-open="props.open" :type="props.type">
    <template #header>
      <h1>Add Item to stock</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 *:border *:border-gray-500 *:rounded-md *:p-2">
        <input placeholder="quantity to add" type="number" v-model="amount" />
        <input placeholder="supplier price" type="number" v-model="price" class="" />
        <input placeholder="supplier price" v-model="description" class="" />
        <input placeholder="supplier price" type="number" v-model="prodType" class="mb-2" />
        <button class="bg-blue-500 hover:bg-blue-500/60 !text-sm m-auto" @click="updateProduct">Add</button>
      </div>
    </template>
  </ModalBase>
</template>