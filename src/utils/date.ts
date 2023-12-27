import { toPlainText } from '@portabletext/react';
import { format, formatDistance, intervalToDuration, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { PortableTextBlock } from 'sanity';
import { getDictionary } from './dictionaries';
import { dateLocales, LocaleNames } from './language';
import { estimateReadingTime } from './string';

export const formatDateTime = (
  publishedAt: string | undefined | null,
  lang: LocaleNames,
): string => {
  if (!publishedAt) return '';

  const dict = getDictionary(lang);

  const today = new Date();
  const formatedPublishedAt = parseISO(publishedAt);
  const { months = 0 } = intervalToDuration({
    start: formatedPublishedAt,
    end: today,
  });

  if (months >= 1) {
    const formattedDateToStr = format(formatedPublishedAt, 'MMMM d, yyyy', {
      locale: dateLocales[lang],
    });
    return `${dict.postPage.in} ${formattedDateToStr}`;
  }

  return formatDistance(parseISO(publishedAt), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
};

export const formatReadingTime = (
  body: PortableTextBlock[],
  lang: LocaleNames,
): string => {
  const dict = getDictionary(lang);

  const text = toPlainText(body);
  const time = estimateReadingTime(text);

  return `${time} min ${dict.reading}`;
};
