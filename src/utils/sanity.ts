import { LocaleNames } from './language';
import { buildFilterString } from './string';

export interface IFilters {
  field: string;
  value: string | number;
  operator: string;
}

export interface IParams {
  page?: number;
  perPage?: number;
  orderBy?: string;
  filters?: IFilters[];
  lang: LocaleNames;
}

export interface QueryResponse {
  filterString: string;
  page: number;
  perPage: number;
  orderBy: string;
  lang: LocaleNames;
}

export const buildQueryParams = (params: IParams): QueryResponse => {
  let {
    page = 0,
    perPage = 10,
    orderBy = 'publishedAt desc',
    filters = [],
  } = params || {};
  page = page > 0 ? page * perPage : 0;
  perPage = page > 0 ? perPage + 1 : perPage;

  let filterString = '';
  if (Array.isArray(filters) && filters.length > 0) {
    filterString = buildFilterString(filters);
    if (filterString) filterString = `&& ${filterString}`;
  }

  return { filterString, page, perPage, orderBy, ...params };
};
