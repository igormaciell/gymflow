import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Formik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import ExerciseEditor from '../../components/ExerciseEditor';
import ErrorView from '../../components/ErrorView';
import SectionHeader from '../../components/SectionHeader';
import styles from './styles';
import { LEVELS, WORKOUT_CATEGORIES } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateWorkout } from '../../utils/validators';
import { safeGoBack } from '../../utils/navigation';

const NEW_EXERCISE = { nome: '', series: '3', repeticoes: '12' };

const EMPTY = {
  nome: '',
  categoria: '',
  nivel: '',
  duracao: '',
  descricao: '',
  exercicios: [NEW_EXERCISE],
};

// Cadastro e edição de treinos, com lista dinâmica de exercícios
export default function WorkoutFormScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { getById, createItem, updateItem } = useData();
  const { id } = route.params || {};
  const workout = id ? getById('treinos', id) : null;
  const isEdit = Boolean(id);

  useEffect(() => {
    navigation.setOptions({ title: t(isEdit ? 'screens.editWorkout' : 'screens.newWorkout') });
  }, [navigation, isEdit, t]);

  if (isEdit && !workout) {
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  // Números viram texto para os campos de edição
  const initialValues = workout
    ? {
        ...workout,
        duracao: String(workout.duracao),
        exercicios: workout.exercicios.map(({ nome, series, repeticoes }) => ({
          nome,
          series: String(series),
          repeticoes: String(repeticoes),
        })),
      }
    : EMPTY;

  const categoryOptions = WORKOUT_CATEGORIES.map((value) => ({
    label: t(`categories.${value}`),
    value,
  }));
  const levelOptions = LEVELS.map((value) => ({ label: t(`levels.${value}`), value }));

  const handleSave = async ({ nome, categoria, nivel, duracao, descricao, exercicios }) => {
    const payload = {
      nome: nome.trim(),
      categoria,
      nivel,
      duracao: Number(duracao),
      descricao: descricao.trim(),
      exercicios: exercicios.map(({ nome: exNome, series, repeticoes }) => ({
        nome: exNome.trim(),
        series: Number(series),
        repeticoes: Number(repeticoes),
      })),
    };
    try {
      if (isEdit) await updateItem('treinos', id, payload);
      else await createItem('treinos', payload);
      showToast(t('workouts.saved'));
      safeGoBack(navigation);
    } catch (error) {
      showToast(t(error.code || 'errors.generic'), 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Formik initialValues={initialValues} validate={validateWorkout} onSubmit={handleSave}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
            submitCount,
          }) => {
            const { exercicios } = values;

            // Comunicação filho -> pai: o ExerciseEditor avisa a alteração por callback
            const changeExercise = (index, field, value) => {
              const next = exercicios.map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
              );
              setFieldValue('exercicios', next);
            };
            const removeExercise = (index) => {
              setFieldValue(
                'exercicios',
                exercicios.filter((_, i) => i !== index),
              );
              setFieldTouched('exercicios', true, false);
            };
            const addExercise = () =>
              setFieldValue('exercicios', [...exercicios, { ...NEW_EXERCISE }]);

            const pick = (field) => (value) => {
              setFieldValue(field, value);
              setFieldTouched(field, true, false);
            };

            return (
              <View>
                <View style={styles.card}>
                  <AppInput
                    label={t('workouts.name')}
                    icon="barbell-outline"
                    placeholder={t('workouts.namePlaceholder')}
                    value={values.nome}
                    onChangeText={handleChange('nome')}
                    onBlur={handleBlur('nome')}
                    error={errors.nome}
                    touched={touched.nome}
                  />
                  <PickerField
                    label={t('workouts.category')}
                    icon="grid-outline"
                    selectedValue={values.categoria}
                    onValueChange={pick('categoria')}
                    options={categoryOptions}
                    error={errors.categoria}
                    touched={touched.categoria}
                  />
                  <PickerField
                    label={t('workouts.level')}
                    icon="speedometer-outline"
                    selectedValue={values.nivel}
                    onValueChange={pick('nivel')}
                    options={levelOptions}
                    error={errors.nivel}
                    touched={touched.nivel}
                  />
                  <AppInput
                    label={t('workouts.duration')}
                    icon="time-outline"
                    value={values.duracao}
                    onChangeText={(text) => setFieldValue('duracao', text.replace(/\D/g, ''))}
                    onBlur={handleBlur('duracao')}
                    error={errors.duracao}
                    touched={touched.duracao}
                    keyboardType="number-pad"
                    maxLength={3}
                  />
                  <AppInput
                    label={t('workouts.description')}
                    placeholder={t('workouts.descriptionPlaceholder')}
                    value={values.descricao}
                    onChangeText={handleChange('descricao')}
                    onBlur={handleBlur('descricao')}
                    error={errors.descricao}
                    touched={touched.descricao}
                    multiline
                  />
                </View>

                <SectionHeader title={`${t('workouts.exercises')} (${exercicios.length})`} />
                {exercicios.map((exercise, index) => (
                  <ExerciseEditor
                    key={`exercise-${index}`}
                    exercise={exercise}
                    index={index}
                    onChange={changeExercise}
                    onRemove={removeExercise}
                  />
                ))}
                {errors.exercicios && (touched.exercicios || submitCount > 0) ? (
                  <Text style={styles.errorText}>{t(errors.exercicios)}</Text>
                ) : null}
                <AppButton
                  title={t('workouts.addExercise')}
                  icon="add-circle-outline"
                  variant="outline"
                  small
                  onPress={addExercise}
                  style={styles.addButton}
                />

                <AppButton
                  title={t('common.save')}
                  icon="checkmark"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
