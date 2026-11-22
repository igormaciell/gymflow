import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Interruptor com rótulo (ex.: aceite dos termos, plano ativo)
export default function SwitchField({ label, value, onValueChange, error, touched }) {
  const { t } = useLanguage();
  const showError = Boolean(error && touched);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.7}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      >
        <Text style={styles.label}>{label}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={colors.surface}
        />
      </TouchableOpacity>
      {showError && <Text style={styles.errorText}>{t(error)}</Text>}
    </View>
  );
}
