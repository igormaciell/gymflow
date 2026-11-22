import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FilterPicker from '../../components/FilterPicker';
import DataList from '../../components/DataList';
import PlanCard from '../../components/PlanCard';
import FloatingButton from '../../components/FloatingButton';
import ConfirmModal from '../../components/ConfirmModal';
import styles from './styles';
import { PLAN_PERIODS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { safeNavigate } from '../../utils/navigation';

const ALL = 'todos';
const STATUS_FILTERS = ['ativos', 'inativos'];

// Lista de planos com filtro por periodicidade e disponibilidade
export default function PlansScreen({ navigation }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { planos, alunos, loading, loadAll, removeItem } = useData();
  const [period, setPeriod] = useState(ALL);
  const [availability, setAvailability] = useState(ALL);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const periodOptions = [
    { label: t('common.all'), value: ALL },
    ...PLAN_PERIODS.map((value) => ({ label: t(`periods.${value}`), value })),
  ];
  const availabilityOptions = [
    { label: t('common.all'), value: ALL },
    { label: t('status.ativo'), value: STATUS_FILTERS[0] },
    { label: t('plans.inactive'), value: STATUS_FILTERS[1] },
  ];

  // O pai filtra e entrega a lista pronta para o DataList (filho)
  const filtered = useMemo(
    () =>
      planos
        .filter((plan) => period === ALL || plan.periodo === period)
        .filter(
          (plan) => availability === ALL || (availability === 'ativos' ? plan.ativo : !plan.ativo),
        )
        .sort((a, b) => a.preco - b.preco),
    [planos, period, availability],
  );

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeItem('planos', toDelete.id);
      showToast(t('plans.deleted'));
      setToDelete(null);
    } catch (error) {
      showToast(t(error.code || 'errors.generic'), 'error');
    } finally {
      setDeleting(false);
    }
  };

  const renderItem = ({ item }) => (
    <PlanCard
      plan={item}
      studentsCount={alunos.filter(({ planoId }) => planoId === item.id).length}
      onEdit={() => safeNavigate(navigation, 'PlanForm', { id: item.id })}
      onDelete={() => setToDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.pickers}>
          <FilterPicker
            label={t('plans.filterPeriod')}
            icon="time-outline"
            selectedValue={period}
            onValueChange={setPeriod}
            options={periodOptions}
          />
          <FilterPicker
            label={t('students.status')}
            icon="funnel-outline"
            selectedValue={availability}
            onValueChange={setAvailability}
            options={availabilityOptions}
          />
        </View>
        <Text style={styles.count}>{t('common.results', { count: filtered.length })}</Text>
      </View>

      <DataList
        data={filtered}
        renderItem={renderItem}
        emptyText={t('plans.empty')}
        emptyIcon="pricetags-outline"
        refreshing={loading}
        onRefresh={loadAll}
      />

      <FloatingButton
        accessibilityLabel={t('screens.newPlan')}
        onPress={() => safeNavigate(navigation, 'PlanForm')}
      />

      <ConfirmModal
        visible={Boolean(toDelete)}
        title={t('plans.deleteTitle')}
        message={t('plans.deleteMessage', { name: toDelete?.nome })}
        confirmLabel={t('common.delete')}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
