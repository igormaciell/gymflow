import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LanguageOption from '../../components/LanguageOption';
import styles from './styles';
import { colors } from '../../constants/theme';
import { LANGUAGES } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';

// Configuração do idioma (pt, en, es) usando o LanguageContext + i18n
export default function LanguageScreen() {
  const { t, locale, changeLanguage } = useLanguage();
  const { showToast } = useToast();
  const { aulas } = useData();

  const handleSelect = (code) => {
    if (code === locale) return;
    if (changeLanguage(code)) {
      // Traduz a confirmação já no idioma escolhido
      showToast(t('language.changed', { locale: code }), 'info');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Ionicons name="language" size={32} color={colors.accent} />
        <Text style={styles.title}>{t('language.title')}</Text>
        <Text style={styles.subtitle}>{t('language.subtitle')}</Text>
      </View>

      <Text style={styles.sectionLabel}>{t('language.current')}</Text>
      {LANGUAGES.map(({ code, flag }) => (
        <LanguageOption
          key={code}
          flag={flag}
          title={t(`language.native.${code}`)}
          subtitle={t(`language.names.${code}`)}
          selected={code === locale}
          onPress={() => handleSelect(code)}
        />
      ))}

      <Text style={styles.sectionLabel}>{t('language.preview')}</Text>
      <View style={styles.previewCard}>
        <Text style={styles.previewMenu}>
          {t('menu.dashboard')} • {t('menu.students')} • {t('menu.workouts')} • {t('menu.classes')}
        </Text>
        <Text style={styles.previewText}>{t('language.previewText', { count: aulas.length })}</Text>
        <View style={styles.previewButton}>
          <Text style={styles.previewButtonText}>{t('common.save')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
