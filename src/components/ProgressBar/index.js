import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { colors } from '../../constants/theme';

// Barra de progresso simples. progress: número entre 0 e 1
export default function ProgressBar({ progress = 0, color = colors.accent, height = 8 }) {
  const safe = Math.min(Math.max(Number(progress) || 0, 0), 1);
  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          { width: `${safe * 100}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}
