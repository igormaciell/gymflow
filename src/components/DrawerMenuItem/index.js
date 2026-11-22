import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';

// Item do menu lateral customizado
export default function DrawerMenuItem({ label, icon, active, onPress, danger = false }) {
  const color = danger ? '#FFB4A2' : active ? colors.accent : '#C9D1E3';

  return (
    <TouchableOpacity
      style={[styles.item, active && styles.itemActive]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: active }}
    >
      {active && <View style={styles.indicator} />}
      <Ionicons name={icon} size={22} color={color} />
      <Text
        style={[styles.label, { color: active ? '#FFFFFF' : color }, active && styles.labelActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
