<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'
import VCalendar, { DatePicker as VDatePicker } from 'v-calendar'
import InputCalendar from '@/components/InputCalendar.vue'
import { useReportStore } from '@/stores/storeReport.ts'

interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emits = defineEmits(['update:modelValue', 'refresh'])

const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const storeReport = useReportStore()

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

const closeModal = () => {
  showModal.value = false;
  storeReport.clearFormAddReport()
}

const onSubmit = async () => {
  // const isValid = await refFormRegisterVacantSchool.value?.validate();
  //
  // if (!isValid?.valid) return;
  // storeBot.storeBot(() => {
  //   closeModal();
  // });
}

watch(() => props.modelValue, () => {
  if(!props.modelValue) {
    closeModal()
  }
})
</script>

<template>
  <Modal v-model="showModal">
    <div class="container-modal">
      <h2>Reporte por fecha de nacimiento</h2>
      <p class="description">Ingresa los siguientes datos para generar tu reporte</p>
      <div class="flex flex-column gap-4">
        <div class="input-group input-group-name w-full">
          <label for="password" class="input-label">Descripción del reporte</label>
          <input
            type="text"
            id="password"
            class="input-field"
            placeholder="Agregar descripción"
            v-model="storeReport.modalAddReport.title"
          />

        </div>
        <div class="container-inputs-dates">
          <p>Fecha de nacimiento</p>
          <div class="container-inputs-dates__dates">
            <InputCalendar
              v-model="storeReport.modalAddReport.start_birthdate"
              name="Inicio"
            />
            <InputCalendar
              v-model="storeReport.modalAddReport.end_birthdate"
              name="Fin"
            />
          </div>
        </div>

        <div class="container-btns">
          <button
            class="btn btn-secondary"
            :disabled="
              !storeReport.modalAddReport.start_birthdate ||
              !storeReport.modalAddReport.end_birthdate ||
              !storeReport.modalAddReport.title
            "
            @click="storeReport.generateReport(
              () => {
                closeModal()
              }
            )"
          >
            Generar reporte
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.container-modal {
  width: 420px !important;

  h2 {
    text-align: center;
    font-size: 18px;
  }

  .description {
    font-size: 12px;
    text-align: center;
    font-weight: lighter;
    color: var(--clr-grey-1);
  }

  .container-inputs-dates {
    display: flex;
    flex-direction: column;
    //margin-top: 12px;
    p {
      margin-bottom: .5rem;
      font-weight: lighter;
      font-size: 14px;
      color: var(--clr-grey-5);
    }

    &__dates {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  .container-btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //margin-top: 24px;
  }
}
</style>
