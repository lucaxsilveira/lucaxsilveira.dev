import { toPlainText } from '@portabletext/react';
import { format, formatDistance, intervalToDuration, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { estimateReadingTime } from './string';

export const formatDateTime = (
  publishedAt: string | undefined | null,
): string => {
  if (!publishedAt) return '';

  const today = new Date();
  const formatedPublishedAt = parseISO(publishedAt);
  const { months = 0 } = intervalToDuration({
    start: formatedPublishedAt,
    end: today,
  });

  if (months >= 1) {
    const formattedDateToStr = format(formatedPublishedAt, 'MMMM d, yyyy');
    return `em ${formattedDateToStr}`;
  }

  return formatDistance(parseISO(publishedAt), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
};

export const formatReadingTime = (body: any): string => {
  const text = toPlainText(body);
  const time = estimateReadingTime(text);
  return `${time} min de leitura`;
};
