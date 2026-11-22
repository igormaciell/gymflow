import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Exercício na tela de detalhes do treino. Toque para marcar como concluído.
export default function ExerciseItem({ exercise, index, done, onToggle }) {
  const { t } = useLanguage();
  const { nome, series, repeticoes } = exercise;

  return (
    <TouchableOpacity
      style={[styles.item, done && styles.itemDone]}
      onPress={onToggle}
      activeOpacity={0.8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
    >
      <View style={[styles.number, done && styles.numberDone]}>
        {done ? (
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        ) : (
          <Text style={styles.numberText}>{index + 1}</Text>
        )}
      </View>
      <View style={styles.texts}>
        <Text style={[styles.name, done && styles.nameDone]}>{nome}</Text>
        <Text style={styles.meta}>
          {t('workouts.setsReps', { sets: series, reps: repeticoes })}
        </Text>
      </View>
      <Ionicons
        name={done ? 'checkmark-circle' : 'ellipse-outline'}
        size={26}
        color={done ? colors.success : colors.border}
      />
    </TouchableOpacity>
  );
}
