// Configuração do i18n (biblioteca i18n-js).
// O dicionário de dados de cada idioma fica em ./locales.
// O idioma atual é controlado pelo LanguageContext (React Context).
import { I18n } from 'i18n-js';
import pt from './locales/pt';
import en from './locales/en';
import es from './locales/es';

export const SUPPORTED_LOCALES = ['pt', 'en', 'es'];

export const i18n = new I18n({ pt, en, es });

i18n.defaultLocale = 'pt';
i18n.locale = 'pt';
// Se faltar alguma chave em um idioma, usa o português
i18n.enableFallback = true;

// Locale completo usado para formatar datas e moeda
export const INTL_LOCALES = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};
