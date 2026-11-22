import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';

// Indicador numérico do dashboard
export default function StatCard({ icon, label, value, color = colors.primary }) {
  return (
    <View style={styles.card} accessibilityLabel={`${label}: ${value}`}>
      <View style={[styles.iconBox, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
