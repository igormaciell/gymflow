import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../Avatar';
import Badge, { statusType } from '../Badge';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Cartão de aluno exibido na lista. Comunicação direta: dados chegam por props (desestruturadas).
export default function StudentCard({ student, planName, onPress }) {
  const { t } = useLanguage();
  const { nome, status, objetivo, checkins } = student;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
    >
      <Avatar name={nome} color={status === 'ativo' ? colors.primary : colors.textMuted} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {nome}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {planName || t('students.noPlan')} • {t(`goals.${objetivo}`)}
        </Text>
        <View style={styles.footer}>
          <Badge label={t(`status.${status}`)} type={statusType(status)} />
          <View style={styles.checkins}>
            <Ionicons name="flame" size={14} color={colors.accent} />
            <Text style={styles.checkinsText}>{checkins}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
