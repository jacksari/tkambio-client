<script setup lang="ts">
import { useReportStore } from '@/stores/storeReport.ts'
import { onMounted } from 'vue'
import { dateText } from '@/helpers/date.ts'
import ReportAdd from '@/views/report/components/ReportAdd.vue'

const storeReport = useReportStore()

onMounted(() => {
  storeReport.getReports()
})

</script>

<template>
  <div>
    <div class="section section-center">
      <div class="flex flex-column align-center justify-center">
        <h3 class="section-title">Generador de reportes TK</h3>
        <button class="btn btn-secondary mb-8" @click="storeReport.getReports()">
          Refrezcar
          <v-icon name="hi-refresh"></v-icon>
        </button>
      </div>
      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Fecha inicio</th>
              <th>Fecha final</th>
              <th>usuario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in storeReport.reports" :key="index">
              <td data-label="#"> {{ index + 1 }}</td>
              <td data-label="Título">{{ report.title }}</td>
              <td data-label="Fecha inicio">{{ dateText(report.start_birthdate) }}</td>
              <td data-label="Fecha final">{{ dateText(report.end_birthdate) }}</td>
              <td data-label="Usuario">{{ report.user.name }}</td>
              <td data-label="Acción">
                <a href="#" class="download-link" @click="storeReport.getReportById(report)">
                  Descargar
                  <v-icon name="hi-solid-download" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="section section-center container-generate-report">
      <button class="btn btn-secondary " @click="storeReport.openModalAddReport()">
        Generar reporte
        <v-icon name="bi-plus-circle"></v-icon>
      </button>
    </div>

    <ReportAdd
      v-model="storeReport.modalAddReport.show"
    />
  </div>
</template>


<style scoped lang="scss">

.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  //max-width: 80%;
  border-collapse: collapse;
  background: #3b5bdb;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  min-width: 500px;

  thead {
    background: #3b5bdb;
    text-transform: uppercase;
    font-weight: bold;

    th {
      padding: 12px;
    }

    th:nth-child(1),
    th:nth-child(3),
    th:nth-child(4) {
      text-align: center;
    }
  }

  tbody {
    tr {
      border-top: 1px solid rgba(255, 255, 255, 0.5);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      td {
        padding: 10px;
        vertical-align: middle;
      }

      td:nth-child(1),
      td:nth-child(3),
      td:nth-child(4) {
        text-align: center;
      }
    }
  }
}

@media (max-width: 768px) {
  .custom-table {
    max-width: 100%;
    min-width: 100%;
  }

  .table-container {
    overflow-x: auto;
  }

  .custom-table thead {
    display: none;
  }

  .custom-table tbody tr {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 10px;
    padding: 10px;
  }

  .custom-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  .custom-table tbody td:last-child {
    border-bottom: none;
  }

  .custom-table tbody td::before {
    content: attr(data-label);
    font-weight: bold;
  }
}


.download-link {
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;

  .icon-download {
    font-size: 14px;
  }
}

.container-generate-report {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

