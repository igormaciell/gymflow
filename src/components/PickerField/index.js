import React from 'react';
import { Text, View } from 'react-native';
import SelectInput from '../SelectInput';
import styles from './styles';
import { useLanguage } from '../../contexts/LanguageContext';

// Seletor usado dentro dos formulários (com rótulo e mensagem de erro do Formik)
export default function PickerField({
  label,
  icon,
  selectedValue,
  onValueChange,
  options,
  error,
  touched,
  placeholder,
}) {
  const { t } = useLanguage();
  const showError = Boolean(error && touched);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <SelectInput
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        options={options}
        placeholder={placeholder ?? t('common.select')}
        icon={icon}
        hasError={showError}
        accessibilityLabel={label}
      />
      {showError && <Text style={styles.errorText}>{t(error)}</Text>}
    </View>
  );
}
