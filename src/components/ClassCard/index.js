import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '../ProgressBar';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Cartão de aula coletiva com barra de ocupação das vagas
export default function ClassCard({ aula, onEdit, onDelete }) {
  const { t } = useLanguage();
  const { modalidade, instrutor, dia, horario, duracao, vagas, inscritos, sala } = aula;
  const free = Math.max(vagas - inscritos, 0);
  const ratio = vagas > 0 ? inscritos / vagas : 0;
  const barColor = ratio >= 1 ? colors.danger : ratio >= 0.8 ? colors.warning : colors.success;

  return (
    <View style={styles.card}>
      <View style={styles.timeBox}>
        <Text style={styles.time}>{horario}</Text>
        <Text style={styles.day}>{t(`days.${dia}`).slice(0, 3)}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{t(`modalities.${modalidade}`)}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onEdit}
              style={styles.actionButton}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={t('common.edit')}
            >
              <Ionicons name="create-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={styles.actionButton}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={t('common.delete')}
            >
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.meta}>
          <Ionicons name="person-outline" size={13} color={colors.textMuted} /> {instrutor}
          {'   '}
          <Ionicons name="location-outline" size={13} color={colors.textMuted} /> {sala}
          {'   '}
          <Ionicons name="time-outline" size={13} color={colors.textMuted} />{' '}
          {t('common.minutes', { count: duracao })}
        </Text>
        <ProgressBar progress={ratio} color={barColor} />
        <View style={styles.capacityRow}>
          <Text style={styles.capacityText}>
            {inscritos}/{vagas} {t('classes.enrolled').toLowerCase()}
          </Text>
          <Text style={[styles.freeText, { color: barColor }]}>
            {free === 0 ? t('classes.full') : t('classes.spots', { count: free })}
          </Text>
        </View>
      </View>
    </View>
  );
}
