
import { useApi } from '@/composables/useApi.ts'
import type {
  IResponseGetListReports,
  IResponseGetReportById,
  IResponsePostGenerateReport
} from '@/interfaces/reports.ts'

const url = "/api/";

class ReportService {
  async listReports(): Promise<IResponseGetListReports> {
    const resp = await useApi(`${url}list-reports`, {
      method: "GET",
    });

    return resp;
  }

  async generateReport(
    start_birthdate: string,
    end_birthdate: string,
    name: string,
  ): Promise<IResponsePostGenerateReport> {
    const resp = await useApi(`${url}generate-report`, {
      method: "POST",
      body: JSON.stringify({ start_birthdate, end_birthdate, name }),
    });

    return resp;
  }

  async getReportById(
    reportId: number,
  ): Promise<IResponseGetReportById> {
    const resp = await useApi(`${url}get-report/${reportId}`, {
      method: "GET",
    });

    return resp;
  }

}
export default new ReportService();
