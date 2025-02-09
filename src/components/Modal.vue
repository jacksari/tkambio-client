<template>
  <teleport to="body">
    <Transition name="fade" appear>
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <Transition name="slide" appear>
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">&times;</button>
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: Boolean // Manejo de v-model
});

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
}
</style>
