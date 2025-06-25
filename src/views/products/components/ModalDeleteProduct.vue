<script setup lang="ts">
import ModalBase from '../../../components/ModalBase.vue';
import { useToast } from 'vue-toast-notification';
import type { ModalType } from '../../../domain/entities/modal-type';
import { DeleteProductService } from '../../../domain/services/product/delete-product';
const props = defineProps<{
  code: string
  open: boolean
  type: ModalType
}>()


async function removeFromStock(){
  try {
    await DeleteProductService.instance.perform(props.code)
    useToast().success("product removed from stock!")
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
        <span>Do you confirm to remove the product from stock?</span>
        <button class="bg-blue-500 hover:bg-blue-500/60 !text-sm m-auto" @click="removeFromStock">Remove</button>
      </div>
    </template>
  </ModalBase>
</template>