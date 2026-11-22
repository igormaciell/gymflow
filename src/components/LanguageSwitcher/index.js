import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { LANGUAGES } from '../../constants/options';
import { useLanguage } from '../../contexts/LanguageContext';

// Troca rápida de idioma (usada na tela de login, antes de entrar no app)
export default function LanguageSwitcher() {
  const { locale, changeLanguage, t } = useLanguage();

  return (
    <View style={styles.container}>
      {LANGUAGES.map(({ code, flag }) => {
        const active = code === locale;
        return (
          <TouchableOpacity
            key={code}
            onPress={() => changeLanguage(code)}
            style={[styles.chip, active && styles.chipActive]}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={t(`language.names.${code}`)}
          >
            <Text style={styles.flag}>{flag}</Text>
            <Text style={[styles.code, active && styles.codeActive]}>{code.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
