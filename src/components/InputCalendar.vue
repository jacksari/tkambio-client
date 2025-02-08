<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { DatePicker as VDatePicker } from 'v-calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  modelValue: Date | null;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: new Date(),
  name: 'Fecha',
});

const emits = defineEmits(["update:modelValue"]);

// Variable reactiva para la fecha seleccionada
const date = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

// Formatear la fecha en dd/MM/yyyy
const formattedDate = computed(() => {
  return date.value ? format(date.value, 'dd/MM/yyyy', { locale: es }) : '---';
});

// Controlar la visibilidad del DatePicker
const showDatePicker = ref(false);

const openDatePicker = () => {
  showDatePicker.value = true;
};

watch(() => date.value, () => {
  closeDatePicker();
});

const closeDatePicker = () => {
  setTimeout(() => {
    showDatePicker.value = false;
  }, 200); // Espera para evitar que se cierre antes de seleccionar
};
</script>

<template>
  <div class="input-group input-group-name">
    <label for="fecha" class="input-label">{{ props.name }}</label>
    <div class="input-container">
      <input
        type="text"
        id="fecha"
        class="input-field"
        :placeholder="props.name"
        :value="formattedDate"
        @focus="openDatePicker"
        readonly
      />
      <span class="calendar-icon" @click="openDatePicker">
        📅
      </span>
    </div>
    <div class="datepicker-container" v-show="showDatePicker">
      <VDatePicker
        locale="es"
        v-model="date"
        mode="date"
        title="MMMM YYYY"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 8px 35px 8px 10px; /* Espacio a la derecha para el icono */
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

/* 📅 Estilos para el icono dentro del input */
.calendar-icon {
  position: absolute;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #555;
  pointer-events: none; /* Para evitar que el icono bloquee el clic en el input */
}

.datepicker-container {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}
</style>
