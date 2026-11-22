import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';

// Linha de informação: ícone + rótulo + valor (telas de detalhes e perfil)
export default function InfoRow({ icon, label, value, last = false }) {
  return (
    <View style={[styles.row, last && styles.last]}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color={colors.accent} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || '-'}</Text>
      </View>
    </View>
  );
}
