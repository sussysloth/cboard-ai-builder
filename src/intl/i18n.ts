import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { supportedLocales, defaultLocale } from './intl.constants';
import deepmerge from 'deepmerge';

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale)) notFound();

  const activeLocaleMessages = (await import(`./dictionaries/${locale}.json`))
    .default;
  const defaultMessages = (await import(`./dictionaries/${defaultLocale}.json`))
    .default;

  return {
    messages: deepmerge(defaultMessages, activeLocaleMessages),
  };
});
