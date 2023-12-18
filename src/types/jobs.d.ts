export interface IJob {
  company: string;
  position: string;
  dateFrom: string;
  dateTo?: string;
  description?: string;
  formattedDates: {
    dateTo?: string;
    dateFrom: string;
    distance: string | null;
  };
}
