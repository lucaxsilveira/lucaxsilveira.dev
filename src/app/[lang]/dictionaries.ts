import { default as enUS } from '@/dictionaries/en-US.json';
import { default as ptBR } from '@/dictionaries/pt-BR.json';
import { LocaleNames } from '@/utils/language';

const dictionaries = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export const getDictionary = (locale: LocaleNames) => dictionaries[locale];
