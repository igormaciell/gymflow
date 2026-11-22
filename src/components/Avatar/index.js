import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../constants/theme';
import { getInitials } from '../../utils/format';

// Círculo com as iniciais do nome
export default function Avatar({
  name,
  size = 48,
  color = colors.primary,
  textColor = colors.textOnPrimary,
}) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}
      accessibilityLabel={name}
    >
      <Text style={[styles.text, { fontSize: size * 0.38, color: textColor }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
