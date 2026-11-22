// Contexto de idioma: guarda o idioma atual e expõe a função de tradução t().
// Qualquer componente usa: const { t, locale, changeLanguage } = useLanguage();
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { i18n, SUPPORTED_LOCALES } from '../i18n';

const LanguageContext = createContext({
  locale: 'pt',
  t: (key) => key,
  changeLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(i18n.defaultLocale);

  // Efeito colateral: sincroniza a instância do i18n sempre que o idioma muda
  useEffect(() => {
    i18n.locale = locale;
  }, [locale]);

  const changeLanguage = useCallback((code) => {
    if (!SUPPORTED_LOCALES.includes(code)) {
      console.warn(`[i18n] Idioma não suportado: ${code}`);
      return false;
    }
    setLocale(code);
    return true;
  }, []);

  // A dependência "locale" faz todos os consumidores renderizarem de novo ao trocar o idioma
  const t = useCallback((key, options = {}) => i18n.t(key, { locale, ...options }), [locale]);

  const value = useMemo(() => ({ locale, t, changeLanguage }), [locale, t, changeLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
