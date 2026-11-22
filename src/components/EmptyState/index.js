import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../AppButton';
import styles from './styles';
import { colors } from '../../constants/theme';

// Mensagem exibida quando uma lista não tem itens
export default function EmptyState({ icon = 'search-outline', message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={36} color={colors.accent} />
      </View>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <AppButton
          title={actionLabel}
          onPress={onAction}
          variant="outline"
          small
          style={styles.button}
        />
      ) : null}
    </View>
  );
}
