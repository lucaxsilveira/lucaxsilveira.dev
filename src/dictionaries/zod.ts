import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

import translationEnUS from 'zod-i18n-map/locales/en/zod.json';
import translationPtBr from 'zod-i18n-map/locales/pt/zod.json';

import { LocaleNames } from '@/utils/language';

export const initZodTranslations = (lang: LocaleNames) => {
  // lng and resources key depend on your locale.
  i18next.init({
    lng: lang,
    resources: {
      pt: { zod: translationPtBr },
      en: { zod: translationEnUS },
    },
  });
  z.setErrorMap(zodI18nMap);
};
