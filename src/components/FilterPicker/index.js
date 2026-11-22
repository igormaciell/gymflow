import React from 'react';
import { Text, View } from 'react-native';
import SelectInput from '../SelectInput';
import styles from './styles';

// Filtro compacto (RNPicker). Quem guarda o valor escolhido é a TELA (componente pai),
// que usa esse valor para filtrar os dados entregues à lista (componente filho).
export default function FilterPicker({ label, icon, selectedValue, onValueChange, options }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectInput
        compact
        icon={icon}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        options={options}
        accessibilityLabel={label}
      />
    </View>
  );
}
