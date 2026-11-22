import React from 'react';
import { Text, View } from 'react-native';
import styles, { badgeColors } from './styles';

// Etiqueta colorida. type: success | warning | danger | accent | neutral
export default function Badge({ label, type = 'neutral' }) {
  const { backgroundColor, color } = badgeColors[type] || badgeColors.neutral;
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

// Mapeia o status do aluno para o tipo de badge
export const statusType = (status) =>
  ({ ativo: 'success', pendente: 'warning', inativo: 'danger' })[status] || 'neutral';
