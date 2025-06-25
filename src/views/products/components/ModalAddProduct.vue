<script setup lang="ts">
import { ref } from 'vue';
import ModalBase from '../../../components/ModalBase.vue';
import { useToast } from 'vue-toast-notification';
import { PostProductService } from '../../../domain/services/product/post-product';
const props = defineProps<{
  open: boolean
  refetch: any
}>()

const amount = ref('')
const price = ref('')
const description = ref('')
const prodType = ref('')
const code = ref('')

async function updateProduct() {
  try {
    await PostProductService.instance.perform(
      code.value,
      Number.parseInt(amount.value),
      Number.parseInt(price.value),
      description.value,
      Number.parseInt(prodType.value)
    )
    useToast().success("product saved!")
    props.refetch()
  } catch (err) {
    if (err instanceof Error)
      useToast().error(err.message)
  }
}
</script>

<template>
  <ModalBase :is-open="props.open" :type="'add'">
    <template #header>
      <h1>Add Item to stock</h1>
    </template>

    <template #body>
      <div class="flex flex-col gap-2 *:border *:border-gray-500 *:rounded-md *:p-2">
        <input placeholder="product code" v-model="code" />
        <input placeholder="quantity to add" type="number" v-model="amount" />
        <input placeholder="supplier price" type="number" v-model="price" class="" />
        <input placeholder="description" v-model="description" class="" />
        <input placeholder="produc type (0-2)" type="number" v-model="prodType" class="mb-2" />
        <button class="bg-blue-500 hover:bg-blue-500/60 !text-sm m-auto" @click="updateProduct">Add</button>
      </div>
    </template>
  </ModalBase>
</template>