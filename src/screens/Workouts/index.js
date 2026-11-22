import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from '../../components/SearchBar';
import FilterPicker from '../../components/FilterPicker';
import DataList from '../../components/DataList';
import WorkoutCard from '../../components/WorkoutCard';
import FloatingButton from '../../components/FloatingButton';
import styles from './styles';
import { LEVELS, WORKOUT_CATEGORIES } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { normalizeText } from '../../utils/format';
import { safeNavigate } from '../../utils/navigation';

const ALL = 'todos';

// Biblioteca de treinos com filtros por categoria e nível (RNPicker + FlatList)
export default function WorkoutsScreen({ navigation }) {
  const { t } = useLanguage();
  const { treinos, loading, loadAll } = useData();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL);
  const [level, setLevel] = useState(ALL);

  const categoryOptions = [
    { label: t('common.all'), value: ALL },
    ...WORKOUT_CATEGORIES.map((value) => ({ label: t(`categories.${value}`), value })),
  ];
  const levelOptions = [
    { label: t('common.all'), value: ALL },
    ...LEVELS.map((value) => ({ label: t(`levels.${value}`), value })),
  ];

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return treinos
      .filter((treino) => category === ALL || treino.categoria === category)
      .filter((treino) => level === ALL || treino.nivel === level)
      .filter((treino) => !term || normalizeText(treino.nome).includes(term));
  }, [treinos, category, level, search]);

  const renderItem = ({ item }) => (
    <WorkoutCard
      workout={item}
      onPress={() => safeNavigate(navigation, 'WorkoutDetail', { id: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={t('workouts.searchPlaceholder')}
        />
        <View style={styles.pickers}>
          <FilterPicker
            label={t('workouts.filterCategory')}
            icon="grid-outline"
            selectedValue={category}
            onValueChange={setCategory}
            options={categoryOptions}
          />
          <FilterPicker
            label={t('workouts.filterLevel')}
            icon="speedometer-outline"
            selectedValue={level}
            onValueChange={setLevel}
            options={levelOptions}
          />
        </View>
        <Text style={styles.count}>{t('common.results', { count: filtered.length })}</Text>
      </View>

      <DataList
        data={filtered}
        renderItem={renderItem}
        emptyText={t('workouts.empty')}
        emptyIcon="barbell-outline"
        refreshing={loading}
        onRefresh={loadAll}
      />

      <FloatingButton
        accessibilityLabel={t('screens.newWorkout')}
        onPress={() => safeNavigate(navigation, 'WorkoutForm')}
      />
    </View>
  );
}
