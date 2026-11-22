import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';

// Cabeçalho das telas de login/cadastro com a marca do app
export default function AuthHeader({ title, subtitle, compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <View style={styles.logoRow}>
        <View style={styles.logo}>
          <Ionicons name="barbell" size={compact ? 22 : 30} color={colors.textOnPrimary} />
        </View>
        <Text style={styles.brand}>
          Gym<Text style={styles.brandAccent}>Flow</Text>
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
