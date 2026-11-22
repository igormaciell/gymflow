import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../constants/theme';

// Indicador de carregamento em tela cheia
export default function LoadingView({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
