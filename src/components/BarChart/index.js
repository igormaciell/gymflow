import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { chartColors } from '../../constants/theme';

// Gráfico de barras horizontais feito apenas com View (sem bibliotecas externas).
// data: [{ label, value }]
export default function BarChart({
  title,
  data = [],
  formatValue = (value) => value,
  colorList = chartColors,
}) {
  const max = Math.max(...data.map(({ value }) => value), 1);

  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {data.map(({ label, value }, index) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                {
                  width: `${(value / max) * 100}%`,
                  backgroundColor: colorList[index % colorList.length],
                },
              ]}
            />
          </View>
          <Text style={styles.value}>{formatValue(value)}</Text>
        </View>
      ))}
    </View>
  );
}
