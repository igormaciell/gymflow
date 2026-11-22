import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { toastColors } from './styles';

const ICONS = { success: 'checkmark-circle', error: 'alert-circle', info: 'information-circle' };

// Mensagem temporária no rodapé. Some sozinha após 2,5 s.
export default function Toast({ message, type = 'success', onHide }) {
  const opacity = useRef(new Animated.Value(0)).current;

  // Efeito colateral: anima a entrada, agenda a saída e limpa o timer ao desmontar
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: false }).start(() =>
        onHide(),
      );
    }, 2500);
    return () => clearTimeout(timer);
  }, [message, opacity, onHide]);

  return (
    <Animated.View
      style={[styles.toast, { backgroundColor: toastColors[type] || toastColors.success, opacity }]}
      accessibilityLiveRegion="polite"
    >
      <Ionicons name={ICONS[type] || ICONS.success} size={22} color="#FFFFFF" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}
