import { ui, defaultLang, type Lang } from './ui';

export function getLang(astroCurrentLocale: string | undefined): Lang {
  return astroCurrentLocale === 'es' ? 'es' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** '' for English (unprefixed root), '/es' for Spanish. Prepend to any internal path. */
export function localeBase(lang: Lang): string {
  return lang === 'es' ? '/es' : '';
}

/** Maps the current URL to its equivalent path in the other locale, for the language switcher. */
export function switchLocalePath(pathname: string, targetLang: Lang): string {
  const withoutEsPrefix = pathname.replace(/^\/es(\/|$)/, '/');
  if (targetLang === 'es') {
    return withoutEsPrefix === '/' ? '/es/' : `/es${withoutEsPrefix}`;
  }
  return withoutEsPrefix;
}
