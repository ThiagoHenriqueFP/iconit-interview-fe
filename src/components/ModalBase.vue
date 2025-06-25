<script setup lang="ts">
import { defineProps, defineEmits, watch, onUnmounted } from 'vue';
import type { ModalType } from '../domain/entities/modal-type';

const props = defineProps<{
  isOpen: boolean; 
  type: ModalType
}>();

const emit = defineEmits<{
  (e: 'close', type: ModalType): void;
}>();


const emitClose = (): void => {
  emit('close', props.type);
};


const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && props.isOpen) {
    emitClose();
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
}, { immediate: true }); 

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="emitClose"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
    >

      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100 opacity-100"
        @click.stop
      >
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <slot name="header"></slot>
          <button
            @click="emitClose"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="Fechar modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6">
          <slot name="body">
            <p class="text-gray-700">Conteúdo padrão do modal.</p>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>