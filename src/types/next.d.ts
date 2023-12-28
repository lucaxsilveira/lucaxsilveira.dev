import { LocaleNames } from '@/utils/language';

export type NextLangParams = {
  params: {
    lang: LocaleNames;
  };
};

export type LayoutProps = {
  params: {
    lang: LocaleNames;
  };
} & IReactChildren;
