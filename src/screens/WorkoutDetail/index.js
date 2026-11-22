import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../../components/Badge';
import ExerciseItem from '../../components/ExerciseItem';
import ProgressBar from '../../components/ProgressBar';
import AppButton from '../../components/AppButton';
import ConfirmModal from '../../components/ConfirmModal';
import ErrorView from '../../components/ErrorView';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';
import { categoryColors, colors } from '../../constants/theme';
import { CATEGORY_ICONS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { safeGoBack, safeNavigate } from '../../utils/navigation';

// Detalhes do treino com checklist de exercícios e progresso
export default function WorkoutDetailScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { getById, removeItem, alunos } = useData();
  const { id } = route.params || {};
  const workout = getById('treinos', id);
  const [done, setDone] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: t('screens.workoutDetail') });
  }, [navigation, t]);

  // Efeito colateral: reinicia o checklist quando muda o treino ou a lista de exercícios
  useEffect(() => {
    setDone([]);
  }, [id, workout?.exercicios?.length]);

  if (!workout) {
    if (deleting) return <View style={styles.container} />;
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  const { nome, categoria, nivel, duracao, descricao, exercicios } = workout;
  const color = categoryColors[categoria] || colors.primary;
  const progress = exercicios.length ? done.length / exercicios.length : 0;
  const studentsUsing = alunos.filter(({ treinoId }) => treinoId === id).length;

  const toggle = (index) =>
    setDone((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeItem('treinos', id);
      setConfirmDelete(false);
      showToast(t('workouts.deleted'));
      safeGoBack(navigation);
    } catch (error) {
      setDeleting(false);
      showToast(t(error.code || 'errors.generic'), 'error');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: color }]}>
          <View style={styles.heroIcon}>
            <Ionicons name={CATEGORY_ICONS[categoria] || 'barbell'} size={28} color={color} />
          </View>
          <Text style={styles.name}>{nome}</Text>
          <View style={styles.heroRow}>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>{t(`categories.${categoria}`)}</Text>
            </View>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>{t(`levels.${nivel}`)}</Text>
            </View>
            <View style={styles.heroChip}>
              <Ionicons name="time-outline" size={13} color="#FFFFFF" />
              <Text style={styles.heroChipText}> {t('common.minutes', { count: duracao })}</Text>
            </View>
          </View>
          <Text style={styles.description}>{descricao}</Text>
          <Text style={styles.using}>
            <Ionicons name="people-outline" size={13} color="#FFFFFF" />{' '}
            {t('workouts.studentsUsing', { count: studentsUsing })}
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{t('workouts.progress')}</Text>
            <Text style={styles.progressValue}>{Math.round(progress * 100)}%</Text>
          </View>
          <ProgressBar
            progress={progress}
            color={progress === 1 ? colors.success : colors.accent}
            height={10}
          />
          {progress === 1 ? (
            <View style={styles.completedRow}>
              <Badge label={t('workouts.completed')} type="success" />
              <TouchableOpacity
                onPress={() => setDone([])}
                hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
              >
                <Text style={styles.reset}>{t('workouts.resetProgress')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.hint}>{t('workouts.tapToCheck')}</Text>
          )}
        </View>

        <SectionHeader title={`${t('workouts.exercises')} (${exercicios.length})`} />
        {exercicios.map((exercise, index) => (
          <ExerciseItem
            key={`${exercise.nome}-${index}`}
            exercise={exercise}
            index={index}
            done={done.includes(index)}
            onToggle={() => toggle(index)}
          />
        ))}

        <View style={styles.actions}>
          <AppButton
            title={t('common.edit')}
            icon="create-outline"
            variant="outline"
            onPress={() => safeNavigate(navigation, 'WorkoutForm', { id })}
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
        title={t('workouts.deleteTitle')}
        message={t('workouts.deleteMessage', { name: nome })}
        confirmLabel={t('common.delete')}
        loading={deleting}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
}
