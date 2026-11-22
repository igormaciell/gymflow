import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';
import ErrorView from '../../components/ErrorView';
import LoadingView from '../../components/LoadingView';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';
import { categoryColors, colors } from '../../constants/theme';
import { STUDENT_STATUS, WORKOUT_CATEGORIES } from '../../constants/options';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { isRemote } from '../../services/api';
import { formatCurrency, monthlyValue } from '../../utils/format';

const RESOURCE_NAMES = ['alunos', 'planos', 'treinos', 'aulas', 'usuarios'];

export default function DashboardScreen() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  // Comunicação indireta: os dados vêm do contexto (desestruturação)
  const { alunos, planos, treinos, aulas, usuarios, loading, error, loadAll } = useData();

  // Indicadores calculados a partir dos dados (recalcula só quando os dados mudam)
  const stats = useMemo(() => {
    const ativos = alunos.filter(({ status }) => status === 'ativo');
    const revenue = ativos.reduce((sum, { planoId }) => {
      const plan = planos.find(({ id }) => id === planoId);
      return sum + (plan ? monthlyValue(plan) : 0);
    }, 0);

    return {
      ativos: ativos.length,
      revenue,
      byPlan: planos.map(({ id, nome }) => ({
        label: nome,
        value: alunos.filter(({ planoId }) => planoId === id).length,
      })),
      byStatus: STUDENT_STATUS.map((status) => ({
        label: t(`status.${status}`),
        value: alunos.filter((aluno) => aluno.status === status).length,
      })),
      byCategory: WORKOUT_CATEGORIES.map((categoria) => ({
        label: t(`categories.${categoria}`),
        value: treinos.filter((treino) => treino.categoria === categoria).length,
      })),
      topCheckins: [...alunos]
        .sort((a, b) => b.checkins - a.checkins)
        .slice(0, 5)
        .map(({ nome, checkins }) => ({ label: nome.split(' ')[0], value: checkins })),
    };
  }, [alunos, planos, treinos, t]);

  if (loading && alunos.length === 0) return <LoadingView message={t('common.loading')} />;

  const firstName = user?.nome?.split(' ')[0] || '';
  const remoteResources = RESOURCE_NAMES.filter(isRemote);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadAll} tintColor={colors.accent} />
      }
    >
      <Text style={styles.greeting}>{t('dashboard.greeting', { name: firstName })}</Text>
      <Text style={styles.subtitle}>{t('dashboard.overview')}</Text>

      {error && (
        <ErrorView compact message={t(error)} actionLabel={t('common.retry')} onAction={loadAll} />
      )}

      <View style={styles.grid}>
        <StatCard icon="people" label={t('dashboard.totalStudents')} value={alunos.length} />
        <StatCard
          icon="checkmark-circle"
          label={t('dashboard.activeStudents')}
          value={stats.ativos}
          color={colors.success}
        />
        <StatCard
          icon="shield-checkmark"
          label={t('dashboard.users')}
          value={usuarios.length}
          color={colors.accent}
        />
        <StatCard
          icon="barbell"
          label={t('dashboard.workouts')}
          value={treinos.length}
          color={colors.accent}
        />
        <StatCard icon="calendar" label={t('dashboard.classes')} value={aulas.length} />
        <StatCard
          icon="pricetags"
          label={t('dashboard.plans')}
          value={planos.length}
          color={colors.success}
        />
      </View>

      <View style={styles.revenueCard}>
        <View style={styles.revenueIcon}>
          <Ionicons name="trending-up" size={26} color={colors.accent} />
        </View>
        <View style={styles.revenueTexts}>
          <Text style={styles.revenueLabel}>{t('dashboard.revenue')}</Text>
          <Text style={styles.revenueValue}>{formatCurrency(stats.revenue, locale)}</Text>
          <Text style={styles.revenueHint}>{t('dashboard.revenueHint')}</Text>
        </View>
      </View>

      <SectionHeader title={t('dashboard.studentsByPlan')} />
      <BarChart data={stats.byPlan} />

      <SectionHeader title={t('dashboard.studentsByStatus')} />
      <BarChart data={stats.byStatus} colorList={[colors.success, colors.warning, colors.danger]} />

      <SectionHeader title={t('dashboard.workoutsByCategory')} />
      <BarChart
        data={stats.byCategory}
        colorList={WORKOUT_CATEGORIES.map((categoria) => categoryColors[categoria])}
      />

      <SectionHeader title={t('dashboard.topCheckins')} />
      <BarChart data={stats.topCheckins} colorList={[colors.accent]} />

      <View style={styles.sourceBox}>
        <Ionicons
          name={remoteResources.length ? 'cloud-done-outline' : 'phone-portrait-outline'}
          size={16}
          color={colors.textMuted}
        />
        <Text style={styles.sourceText}>
          {t('dashboard.dataSource')}:{' '}
          {remoteResources.length
            ? `${t('common.remoteMode')} (${remoteResources.join(', ')})`
            : t('common.localMode')}
        </Text>
      </View>
    </ScrollView>
  );
}
