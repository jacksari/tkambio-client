// import useToast from "@/composables/useToast";
// import type {
//   IResponseProfile,
//   IResponseRegister,
//   StoreAuth,
// } from "@/interfaces/auth";
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IReportList } from '@/interfaces/reports.ts'
import reportService from '@/services/reportService.ts'
import { dateToApi } from '@/helpers/date.ts'

// const { toggle } = useToast();
// const { showConfirmSwal } = useSwal();
// const { isPreloading } = useLoading();

export const useReportStore = defineStore('reports', () => {

  const reports = ref<IReportList[]>([])

  const modalAddReport = ref<{
    show: boolean,
    start_birthdate: string | null,
    end_birthdate: string | null,
    title: string | null,
  }>({
    show: false,
    start_birthdate: null,
    end_birthdate: null,
    title: null
  })

  const getReports = async () => {
    const resp = await reportService.listReports()
    reports.value = resp.data
  }

  const openModalAddReport = async () => {
    modalAddReport.value.show = true;
  }

  const generateReport = async (
    refresh = () => {}
  ) => {
    const resp = await reportService.generateReport(
      dateToApi(modalAddReport.value.start_birthdate),
      dateToApi(modalAddReport.value.end_birthdate),
      modalAddReport.value.title
    )
    refresh();
    await getReports()
  }

  const getReportById = async (report: IReportList) => {
    const resp = await reportService.getReportById(report.id);
    const fileUrl = resp.data.report_link;

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      console.error("No se encontró el enlace de descarga.");
    }
  }

  const clearFormAddReport = () => {
    modalAddReport.value.title = null;
    modalAddReport.value.start_birthdate = null;
    modalAddReport.value.end_birthdate = null;
  }

  return {
    reports,
    getReports,
    modalAddReport,
    openModalAddReport,
    generateReport,
    getReportById,
    clearFormAddReport
  }
})
