import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Linha editável de exercício dentro do formulário de treino.
// O formulário (pai) recebe as alterações pelo callback onChange(index, campo, valor).
export default function ExerciseEditor({ exercise, index, onChange, onRemove }) {
  const { t } = useLanguage();
  const { nome, series, repeticoes } = exercise;

  return (
    <View style={styles.row}>
      <Text style={styles.index}>{index + 1}</Text>
      <View style={styles.fields}>
        <TextInput
          style={[styles.input, styles.nameInput]}
          value={nome}
          onChangeText={(text) => onChange(index, 'nome', text)}
          placeholder={t('workouts.exerciseName')}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={`${t('workouts.exerciseName')} ${index + 1}`}
        />
        <View style={styles.numbers}>
          <View style={styles.numberBox}>
            <Text style={styles.smallLabel}>{t('workouts.sets')}</Text>
            <TextInput
              style={[styles.input, styles.numberInput]}
              value={String(series ?? '')}
              onChangeText={(text) => onChange(index, 'series', text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={2}
              accessibilityLabel={t('workouts.sets')}
            />
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.smallLabel}>{t('workouts.reps')}</Text>
            <TextInput
              style={[styles.input, styles.numberInput]}
              value={String(repeticoes ?? '')}
              onChangeText={(text) => onChange(index, 'repeticoes', text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={3}
              accessibilityLabel={t('workouts.reps')}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(index)}
        style={styles.remove}
        hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={t('common.delete')}
      >
        <Ionicons name="close-circle" size={24} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}
