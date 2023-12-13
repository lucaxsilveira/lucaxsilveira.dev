export const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
  return readingTime || 1;
};

interface IFilters {
  [key: string]: {
    field: string;
    value: string;
    operator: string;
  };
}

export const buildFilterString = (filters: IFilters[]) => {
  if (!Array.isArray(filters) || filters.length === 0) {
    return '';
  }

  const filterStrings = filters.map((filter) => {
    const { field, value, operator } = filter;
    if (field && value && operator) {
      return `${field} ${operator} ${JSON.stringify(value)}`;
    }
  });

  return filterStrings.join(' && ');
};
