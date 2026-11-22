import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../AppButton';
import styles from './styles';
import { colors } from '../../constants/theme';

// Bloco de erro com botão de tentar novamente (ex.: falha na API)
export default function ErrorView({ message, actionLabel, onAction, compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Ionicons name="alert-circle" size={compact ? 22 : 40} color={colors.danger} />
      <Text style={[styles.message, compact && styles.messageCompact]}>{message}</Text>
      {actionLabel && onAction ? (
        <AppButton
          title={actionLabel}
          onPress={onAction}
          variant="outline"
          icon="refresh"
          small
          style={compact ? styles.buttonCompact : styles.button}
        />
      ) : null}
    </View>
  );
}
