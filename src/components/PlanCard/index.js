import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../Badge';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatCurrency, monthlyValue } from '../../utils/format';

// Cartão de plano com preço em destaque e ações de editar/excluir
export default function PlanCard({ plan, studentsCount, onEdit, onDelete }) {
  const { t, locale } = useLanguage();
  const { nome, preco, periodo, descricao, ativo } = plan;

  return (
    <View style={[styles.card, !ativo && styles.cardInactive]}>
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.name}>{nome}</Text>
          <View style={styles.badges}>
            <Badge label={t(`periods.${periodo}`)} type="accent" />
            {!ativo && <View style={styles.spacer} />}
            {!ativo && <Badge label={t('plans.inactive')} type="danger" />}
          </View>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{formatCurrency(preco, locale)}</Text>
          {periodo !== 'mensal' && (
            <Text style={styles.monthly}>
              {t('plans.perMonth', { value: formatCurrency(monthlyValue(plan), locale) })}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.description}>{descricao}</Text>
      <View style={styles.footer}>
        <View style={styles.students}>
          <Ionicons name="people-outline" size={16} color={colors.textMuted} />
          <Text style={styles.studentsText}>
            {t('plans.studentsCount', { count: studentsCount })}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onEdit}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={t('common.edit')}
          >
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onDelete}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={t('common.delete')}
          >
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
