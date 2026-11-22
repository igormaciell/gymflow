import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import FilterPicker from '../../components/FilterPicker';
import DataList from '../../components/DataList';
import ClassCard from '../../components/ClassCard';
import FloatingButton from '../../components/FloatingButton';
import ConfirmModal from '../../components/ConfirmModal';
import styles from './styles';
import { MODALITIES, WEEK_DAYS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { safeNavigate } from '../../utils/navigation';

const ALL = 'todos';

// Grade de aulas coletivas filtrada por dia da semana e modalidade
export default function ClassesScreen({ navigation }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { aulas, loading, loadAll, removeItem } = useData();
  const [day, setDay] = useState(ALL);
  const [modality, setModality] = useState(ALL);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const dayOptions = [
    { label: t('common.all'), value: ALL },
    ...WEEK_DAYS.map((value) => ({ label: t(`days.${value}`), value })),
  ];
  const modalityOptions = [
    { label: t('common.all'), value: ALL },
    ...MODALITIES.map((value) => ({ label: t(`modalities.${value}`), value })),
  ];

  // Filtra e ordena por dia da semana e horário
  const filtered = useMemo(
    () =>
      aulas
        .filter((aula) => day === ALL || aula.dia === day)
        .filter((aula) => modality === ALL || aula.modalidade === modality)
        .sort(
          (a, b) =>
            WEEK_DAYS.indexOf(a.dia) - WEEK_DAYS.indexOf(b.dia) ||
            a.horario.localeCompare(b.horario),
        ),
    [aulas, day, modality],
  );

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeItem('aulas', toDelete.id);
      showToast(t('classes.deleted'));
      setToDelete(null);
    } catch (error) {
      showToast(t(error.code || 'errors.generic'), 'error');
    } finally {
      setDeleting(false);
    }
  };

  const renderItem = ({ item }) => (
    <ClassCard
      aula={item}
      onEdit={() => safeNavigate(navigation, 'ClassForm', { id: item.id })}
      onDelete={() => setToDelete(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.pickers}>
          <FilterPicker
            label={t('classes.filterDay')}
            icon="calendar-outline"
            selectedValue={day}
            onValueChange={setDay}
            options={dayOptions}
          />
          <FilterPicker
            label={t('classes.filterModality')}
            icon="bicycle-outline"
            selectedValue={modality}
            onValueChange={setModality}
            options={modalityOptions}
          />
        </View>
        <Text style={styles.count}>{t('common.results', { count: filtered.length })}</Text>
      </View>

      <DataList
        data={filtered}
        renderItem={renderItem}
        emptyText={t('classes.empty')}
        emptyIcon="calendar-outline"
        refreshing={loading}
        onRefresh={loadAll}
      />

      <FloatingButton
        accessibilityLabel={t('screens.newClass')}
        onPress={() => safeNavigate(navigation, 'ClassForm')}
      />

      <ConfirmModal
        visible={Boolean(toDelete)}
        title={t('classes.deleteTitle')}
        message={t('classes.deleteMessage', {
          name: toDelete ? t(`modalities.${toDelete.modalidade}`) : '',
        })}
        confirmLabel={t('common.delete')}
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
