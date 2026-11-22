import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../Badge';
import styles from './styles';
import { categoryColors, colors } from '../../constants/theme';
import { CATEGORY_ICONS } from '../../constants/options';
import { useLanguage } from '../../contexts/LanguageContext';

// Cartão de treino: faixa lateral com a cor da categoria
export default function WorkoutCard({ workout, onPress }) {
  const { t } = useLanguage();
  const { nome, categoria, nivel, duracao, exercicios = [] } = workout;
  const color = categoryColors[categoria] || colors.primary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
    >
      <View style={[styles.stripe, { backgroundColor: color }]} />
      <View style={[styles.iconBox, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={CATEGORY_ICONS[categoria] || 'barbell'} size={24} color={color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {nome}
        </Text>
        <View style={styles.row}>
          <Badge label={t(`categories.${categoria}`)} type="neutral" />
          <Text style={styles.level}>{t(`levels.${nivel}`)}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>{t('common.minutes', { count: duracao })}</Text>
          <Ionicons
            name="list-outline"
            size={14}
            color={colors.textMuted}
            style={styles.metaIcon}
          />
          <Text style={styles.meta}>
            {t('workouts.exercisesCount', { count: exercicios.length })}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
