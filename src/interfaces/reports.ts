export interface IReportList {
  id: number;
  title: string;
  start_birthdate: string;
  end_birthdate: string;
  report_link: string;
  user: {
    name: string;
  }
}

export interface IResponseGetListReports{
  data: IReportList[];
  message: string;
  status: boolean;
}

export interface IResponsePostGenerateReport{
  data: null;
  message: string;
  status: boolean;
}

export interface IResponseGetReportById{
  data: {
    created_by: number;
    created_by_name: string;
    end_birthdate: string;
    id: number;
    report_link: string;
    start_birthdate: string;
    title: string;
  };
  message: string;
  status: boolean;
}
