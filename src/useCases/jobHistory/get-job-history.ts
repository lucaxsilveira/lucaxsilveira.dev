import { sanityFetch } from '@/services/sanity';
import { IJob } from '@/types/jobs';
import { IParams, buildQueryParams } from '@/utils/sanity';
import { format, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import groq from 'groq';

const DEFAULT_PARAMS = {} as IParams;

type PeriodProps = {
  value: number | undefined;
  unit: string;
  union: string;
};

const getPeriodString = ({ value, unit, union }: PeriodProps): string => {
  if (!value) return '';
  return `${value} ${unit}${value > 1 ? union : ''}`;
};

const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM yyyy', {
    locale: ptBR,
  });
};

const getJobHistory = async (params = DEFAULT_PARAMS): Promise<IJob[]> => {
  try {
    let { page, perPage, orderBy, filters } = buildQueryParams(params);

    const jobs = await sanityFetch<IJob[]>({
      query: groq`*[_type == "jobHistory" ${filters}]  | order(${orderBy}) [${page}...${perPage}]{
      company,
      position,
      dateFrom,
      dateTo,
      description
    }`,
      tags: ['job-history'],
      ...params,
    });

    return jobs.map((job) => {
      const dateFromFmt = formatDate(job.dateFrom);
      const dateToFmt = job.dateTo ? formatDate(job.dateTo) : undefined;
      const endDate = job.dateTo ? new Date(job.dateTo) : new Date();

      const interval = intervalToDuration({
        start: new Date(job.dateFrom),
        end: endDate,
      });

      const periods = [
        getPeriodString({ value: interval.years, unit: 'ano', union: 's' }),
        getPeriodString({ value: interval.months, unit: 'mes', union: 'es' }),
      ];

      const distance = periods.filter(Boolean).join(' e ');

      return {
        ...job,
        formattedDates: {
          dateFrom: dateFromFmt,
          dateTo: dateToFmt,
          distance,
        },
      };
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getJobHistory };
