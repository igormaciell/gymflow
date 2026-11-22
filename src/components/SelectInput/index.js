import React, { useState } from 'react';
import { Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Base dos seletores do app (usa o RNPicker: @react-native-picker/picker).
// No Android e na Web o Picker aparece direto; no iOS abre em um modal
// para a "roda" do Picker não ocupar a tela inteira.
export default function SelectInput({
  selectedValue,
  onValueChange,
  options = [],
  placeholder,
  icon,
  hasError = false,
  compact = false,
  accessibilityLabel,
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === selectedValue);
  const iconColor = hasError ? colors.danger : colors.textMuted;

  const pickerItems = [
    placeholder !== undefined && (
      <Picker.Item key="__placeholder" label={placeholder} value="" color={colors.textMuted} />
    ),
    ...options.map(({ label, value }) => (
      <Picker.Item key={String(value)} label={label} value={value} />
    )),
  ].filter(Boolean);

  if (Platform.OS === 'ios') {
    return (
      <>
        <TouchableOpacity
          style={[styles.wrapper, compact && styles.compact, hasError && styles.error]}
          onPress={() => setOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
        >
          {icon && <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} />}
          <Text style={[styles.valueText, !selected && styles.placeholder]} numberOfLines={1}>
            {selected ? selected.label : placeholder}
          </Text>
          <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
        </TouchableOpacity>
        <Modal
          visible={open}
          transparent
          animationType="slide"
          onRequestClose={() => setOpen(false)}
        >
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <TouchableOpacity style={styles.doneButton} onPress={() => setOpen(false)}>
              <Text style={styles.doneText}>{t('common.confirm')}</Text>
            </TouchableOpacity>
            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
              {pickerItems}
            </Picker>
          </View>
        </Modal>
      </>
    );
  }

  return (
    <View style={[styles.wrapper, compact && styles.compact, hasError && styles.error]}>
      {icon && <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} />}
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor={colors.textMuted}
        mode="dropdown"
        accessibilityLabel={accessibilityLabel}
      >
        {pickerItems}
      </Picker>
    </View>
  );
}
