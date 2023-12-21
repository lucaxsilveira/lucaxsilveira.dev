import { enUS, ptBR } from 'date-fns/locale';

export const locales = ['en-US', 'pt-BR'] as const;
export const defaultLocale = 'pt-BR';

export type LocaleNames = (typeof locales)[number];

type Locales = {
  [key: string]: Locale;
};

export const dateLocales: Locales = {
  'pt-BR': ptBR,
  'en-US': enUS,
};
