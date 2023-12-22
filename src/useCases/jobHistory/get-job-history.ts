import { format, intervalToDuration } from 'date-fns';
import groq from 'groq';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { sanityFetch } from '@/services/sanity';
import { IJob } from '@/types/jobs';
import { dateLocales } from '@/utils/language';
import { buildQueryParams, IParams } from '@/utils/sanity';

const DEFAULT_PARAMS = {} as IParams;

type PeriodProps = {
  value: number | undefined;
  singular: string;
  plural: string;
};

const getPeriodString = ({ value, singular, plural }: PeriodProps): string => {
  if (!value) return '';
  const isPlural = value > 1;

  return `${value} ${isPlural ? plural : singular}`;
};

const formatDate = (date: string, locale: string): string => {
  return format(new Date(date), 'MMM yyyy', {
    locale: dateLocales[locale],
  });
};

const getJobHistory = async (params = DEFAULT_PARAMS): Promise<IJob[]> => {
  try {
    let { page, perPage, orderBy, filters, lang } = buildQueryParams(params);

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

    const dict = getDictionary(lang);

    return jobs.map((job) => {
      const dateFromFmt = formatDate(job.dateFrom, lang);
      const dateToFmt = job.dateTo ? formatDate(job.dateTo, lang) : undefined;
      const endDate = job.dateTo ? new Date(job.dateTo) : new Date();

      const interval = intervalToDuration({
        start: new Date(job.dateFrom),
        end: endDate,
      });

      const periods = [
        getPeriodString({
          value: interval.years,
          singular: dict.year,
          plural: dict.years,
        }),
        getPeriodString({
          value: interval.months,
          singular: dict.month,
          plural: dict.months,
        }),
      ];

      const distance = periods.filter(Boolean).join(` ${dict.and} `);

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
