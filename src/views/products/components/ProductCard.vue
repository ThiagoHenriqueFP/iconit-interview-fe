<script setup lang="ts">
const props = defineProps({
  code: String,
  type: String,
  description: String,
  quantitiy: Number
})
</script>

<template>
  <div class="flex flex-col rounded-2xl bg-gray-200 p-4 shadow-sm">
    <div class="flex font-semibold">
      <span>{{ props.code }}</span>
      <span class="ml-auto text-xs">{{ props.type?.replace('_', ' ') }}</span>
    </div>
    <div class="flex">
    <span>{{ props.description }}</span>
    <span class="ml-auto text-xs"><span class="font-semibold">{{ props.quantitiy }}</span> in stock</span>
    </div>
    <div class="ml-auto flex gap-1">
      <button class="max-w-fit bg-blue-500 text-white font-semibold !text-xs">Add item</button>    
      <button class="max-w-fit bg-amber-700 text-white font-semibold !text-xs">Purchase item</button>
    </div>
  </div>
</template>