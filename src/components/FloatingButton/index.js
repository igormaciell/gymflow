import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

// Botão flutuante (FAB) para criar um novo registro
export default function FloatingButton({ icon = 'add', onPress, accessibilityLabel }) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Ionicons name={icon} size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
