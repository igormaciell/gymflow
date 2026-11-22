import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import Badge, { statusType } from '../../components/Badge';
import InfoRow from '../../components/InfoRow';
import AppButton from '../../components/AppButton';
import ConfirmModal from '../../components/ConfirmModal';
import ErrorView from '../../components/ErrorView';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { formatCurrency, formatDate } from '../../utils/format';
import { getAge } from '../../utils/validators';
import { safeGoBack, safeNavigate } from '../../utils/navigation';

// Detalhes do aluno: dados, plano, treino atual, check-in e exclusão (Read / Update / Delete)
export default function StudentDetailScreen({ navigation, route }) {
  const { t, locale } = useLanguage();
  const { showToast } = useToast();
  const { getById, updateItem, removeItem } = useData();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Parâmetro recebido pela navegação (desestruturação)
  const { id } = route.params || {};
  const student = getById('alunos', id);

  // Efeito colateral: título traduzido no cabeçalho
  useEffect(() => {
    navigation.setOptions({ title: t('screens.studentDetail') });
  }, [navigation, t]);

  // Tratamento de erro: aluno inexistente (id inválido ou excluído)
  if (!student) {
    if (deleting) return <View style={styles.container} />;
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  const {
    nome,
    email,
    telefone,
    nascimento,
    objetivo,
    status,
    checkins,
    planoId,
    treinoId,
    observacoes,
    criadoEm,
  } = student;
  const plan = getById('planos', planoId);
  const workout = getById('treinos', treinoId);
  const age = getAge(nascimento);

  const handleCheckin = async () => {
    setBusy(true);
    try {
      await updateItem('alunos', id, {
        checkins: checkins + 1,
        ultimoCheckin: new Date().toISOString(),
      });
      showToast(t('students.checkinDone', { name: nome.split(' ')[0] }));
    } catch (error) {
      showToast(t(error.code || 'errors.generic'), 'error');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    setDeleting(true);
    try {
      await removeItem('alunos', id);
      setConfirmDelete(false);
      showToast(t('students.deleted'));
      safeGoBack(navigation);
    } catch (error) {
      setBusy(false);
      setDeleting(false);
      showToast(t(error.code || 'errors.generic'), 'error');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Avatar name={nome} size={72} color={colors.accent} />
          <Text style={styles.name}>{nome}</Text>
          <View style={styles.heroRow}>
            <Badge label={t(`status.${status}`)} type={statusType(status)} />
            {age !== null && (
              <Text style={styles.heroMeta}>{t('students.age', { count: age })}</Text>
            )}
          </View>
          <Text style={styles.since}>
            {t('students.since', { date: formatDate(criadoEm, locale) })}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="flame" size={22} color={colors.accent} />
            <Text style={styles.statValue}>{checkins}</Text>
            <Text style={styles.statLabel}>{t('students.checkins')}</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="pricetag" size={22} color={colors.primary} />
            <Text style={styles.statValue} numberOfLines={1}>
              {plan ? plan.nome : '-'}
            </Text>
            <Text style={styles.statLabel}>{t('students.plan')}</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="flag" size={22} color={colors.success} />
            <Text style={styles.statValueSmall} numberOfLines={2}>
              {t(`goals.${objetivo}`)}
            </Text>
            <Text style={styles.statLabel}>{t('students.goal')}</Text>
          </View>
        </View>

        <AppButton
          title={t('students.checkin')}
          icon="enter-outline"
          onPress={handleCheckin}
          loading={busy && !confirmDelete}
        />

        <SectionHeader title={t('students.contact')} />
        <View style={styles.card}>
          <InfoRow icon="mail-outline" label={t('students.email')} value={email} />
          <InfoRow icon="call-outline" label={t('students.phone')} value={telefone} />
          <InfoRow icon="calendar-outline" label={t('students.birth')} value={nascimento} last />
        </View>

        <SectionHeader
          title={t('students.training')}
          actionLabel={workout ? t('students.viewWorkout') : undefined}
          onAction={
            workout
              ? () => safeNavigate(navigation, 'WorkoutDetail', { id: workout.id })
              : undefined
          }
        />
        <View style={styles.card}>
          <InfoRow
            icon="pricetag-outline"
            label={t('students.plan')}
            value={
              plan
                ? `${plan.nome} • ${formatCurrency(plan.preco, locale)} (${t(`periods.${plan.periodo}`)})`
                : t('students.noPlan')
            }
          />
          <InfoRow
            icon="barbell-outline"
            label={t('students.workout')}
            value={workout ? workout.nome : t('students.noWorkout')}
          />
          <InfoRow
            icon="document-text-outline"
            label={t('students.notes')}
            value={observacoes}
            last
          />
        </View>

        <View style={styles.actions}>
          <AppButton
            title={t('common.edit')}
            icon="create-outline"
            variant="outline"
            onPress={() => safeNavigate(navigation, 'StudentForm', { id })}
            style={styles.actionButton}
          />
          <View style={styles.gap} />
          <AppButton
            title={t('common.delete')}
            icon="trash-outline"
            variant="danger"
            onPress={() => setConfirmDelete(true)}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      <ConfirmModal
        visible={confirmDelete}
        title={t('students.deleteTitle')}
        message={t('students.deleteMessage', { name: nome })}
        confirmLabel={t('common.delete')}
        loading={busy}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
