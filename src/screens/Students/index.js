import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from '../../components/SearchBar';
import FilterPicker from '../../components/FilterPicker';
import DataList from '../../components/DataList';
import StudentCard from '../../components/StudentCard';
import FloatingButton from '../../components/FloatingButton';
import ErrorView from '../../components/ErrorView';
import styles from './styles';
import { STUDENT_STATUS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { normalizeText } from '../../utils/format';
import { safeNavigate } from '../../utils/navigation';

const ALL = 'todos';

// Lista de alunos. A TELA (pai) guarda os filtros e entrega ao DataList (filho)
// somente os itens que passaram pelos filtros do RNPicker + busca.
export default function StudentsScreen({ navigation }) {
  const { t } = useLanguage();
  const { alunos, planos, loading, error, loadAll } = useData();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(ALL);
  const [planoId, setPlanoId] = useState(ALL);

  // Efeito colateral: se o plano escolhido no filtro for excluído, volta para "Todos"
  useEffect(() => {
    if (planoId !== ALL && !planos.some(({ id }) => id === planoId)) setPlanoId(ALL);
  }, [planos, planoId]);

  const statusOptions = [
    { label: t('common.all'), value: ALL },
    ...STUDENT_STATUS.map((value) => ({ label: t(`status.${value}`), value })),
  ];
  const planOptions = [
    { label: t('common.all'), value: ALL },
    ...planos.map(({ id, nome }) => ({ label: nome, value: id })),
  ];

  // Filtro aplicado pelo componente pai
  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return alunos
      .filter((aluno) => status === ALL || aluno.status === status)
      .filter((aluno) => planoId === ALL || aluno.planoId === planoId)
      .filter((aluno) => !term || normalizeText(aluno.nome).includes(term))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }, [alunos, status, planoId, search]);

  const getPlanName = useCallback(
    (id) => (planos.find((plan) => plan.id === id) || {}).nome,
    [planos],
  );

  const renderItem = ({ item }) => (
    <StudentCard
      student={item}
      planName={getPlanName(item.planoId)}
      onPress={() => safeNavigate(navigation, 'StudentDetail', { id: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={t('students.searchPlaceholder')}
        />
        <View style={styles.pickers}>
          <FilterPicker
            label={t('students.filterStatus')}
            icon="funnel-outline"
            selectedValue={status}
            onValueChange={setStatus}
            options={statusOptions}
          />
          <FilterPicker
            label={t('students.filterPlan')}
            icon="pricetag-outline"
            selectedValue={planoId}
            onValueChange={setPlanoId}
            options={planOptions}
          />
        </View>
        <Text style={styles.count}>{t('common.results', { count: filtered.length })}</Text>
      </View>

      {error && (
        <ErrorView compact message={t(error)} actionLabel={t('common.retry')} onAction={loadAll} />
      )}

      <DataList
        data={filtered}
        renderItem={renderItem}
        emptyText={t('students.empty')}
        emptyIcon="people-outline"
        refreshing={loading}
        onRefresh={loadAll}
      />

      <FloatingButton
        icon="person-add"
        accessibilityLabel={t('screens.newStudent')}
        onPress={() => safeNavigate(navigation, 'StudentForm')}
      />
    </View>
  );
}
