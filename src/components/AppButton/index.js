import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { variantStyles } from './styles';
import { colors } from '../../constants/theme';

// Botão padrão do app. Variantes: primary | secondary | outline | danger | ghost
export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  small = false,
  style,
}) {
  const { container, text } = variantStyles[variant] || variantStyles.primary;
  const isDisabled = disabled || loading;
  const contentColor = text.color || colors.textOnPrimary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.base, small && styles.small, container, isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons name={icon} size={small ? 16 : 20} color={contentColor} style={styles.icon} />
          )}
          <Text style={[styles.text, small && styles.textSmall, text]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
