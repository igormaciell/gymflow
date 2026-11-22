import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import ErrorView from '../../components/ErrorView';
import styles from './styles';
import { GOALS, STUDENT_STATUS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateStudent } from '../../utils/validators';
import { maskDate, maskPhone } from '../../utils/format';
import { safeGoBack } from '../../utils/navigation';

const EMPTY = {
  nome: '',
  email: '',
  telefone: '',
  nascimento: '',
  objetivo: '',
  planoId: '',
  status: 'ativo',
  treinoId: '',
  observacoes: '',
};

// Cadastro e edição de aluno (Create / Update do CRUD)
export default function StudentFormScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { planos, treinos, getById, createItem, updateItem } = useData();
  const { id } = route.params || {};
  const student = id ? getById('alunos', id) : null;
  const isEdit = Boolean(id);

  // Efeito colateral: título do cabeçalho conforme o modo e o idioma
  useEffect(() => {
    navigation.setOptions({ title: t(isEdit ? 'screens.editStudent' : 'screens.newStudent') });
  }, [navigation, isEdit, t]);

  // Tratamento de erro: id recebido por parâmetro não existe mais
  if (isEdit && !student) {
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  const initialValues = student ? { ...EMPTY, ...student } : EMPTY;

  const options = {
    goals: GOALS.map((value) => ({ label: t(`goals.${value}`), value })),
    status: STUDENT_STATUS.map((value) => ({ label: t(`status.${value}`), value })),
    plans: planos.map(({ id: value, nome }) => ({ label: nome, value })),
    workouts: treinos.map(({ id: value, nome }) => ({ label: nome, value })),
  };

  const handleSave = async (values) => {
    const { nome, email, telefone, nascimento, objetivo, planoId, status, treinoId, observacoes } =
      values;
    const payload = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone,
      nascimento,
      objetivo,
      planoId,
      status,
      treinoId,
      observacoes: observacoes.trim(),
    };
    try {
      if (isEdit) await updateItem('alunos', id, payload);
      else
        await createItem('alunos', { ...payload, checkins: 0, criadoEm: new Date().toISOString() });
      showToast(t('students.saved'));
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
        <Formik initialValues={initialValues} validate={validateStudent} onSubmit={handleSave}>
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
          }) => {
            // Atualiza o valor do Picker e marca o campo como "tocado"
            const pick = (field) => (value) => {
              setFieldValue(field, value);
              setFieldTouched(field, true, false);
            };

            return (
              <View style={styles.card}>
                <AppInput
                  label={t('students.name')}
                  icon="person-outline"
                  placeholder={t('auth.namePlaceholder')}
                  value={values.nome}
                  onChangeText={handleChange('nome')}
                  onBlur={handleBlur('nome')}
                  error={errors.nome}
                  touched={touched.nome}
                  autoCapitalize="words"
                />
                <AppInput
                  label={t('students.email')}
                  icon="mail-outline"
                  placeholder={t('students.emailPlaceholder')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <AppInput
                  label={t('students.phone')}
                  icon="call-outline"
                  placeholder={t('auth.phonePlaceholder')}
                  value={values.telefone}
                  onChangeText={(text) => setFieldValue('telefone', maskPhone(text))}
                  onBlur={handleBlur('telefone')}
                  error={errors.telefone}
                  touched={touched.telefone}
                  keyboardType="phone-pad"
                />
                <AppInput
                  label={t('students.birth')}
                  icon="calendar-outline"
                  placeholder={t('students.birthPlaceholder')}
                  value={values.nascimento}
                  onChangeText={(text) => setFieldValue('nascimento', maskDate(text))}
                  onBlur={handleBlur('nascimento')}
                  error={errors.nascimento}
                  touched={touched.nascimento}
                  keyboardType="number-pad"
                />
                <PickerField
                  label={t('students.goal')}
                  icon="flag-outline"
                  selectedValue={values.objetivo}
                  onValueChange={pick('objetivo')}
                  options={options.goals}
                  error={errors.objetivo}
                  touched={touched.objetivo}
                />
                <PickerField
                  label={t('students.plan')}
                  icon="pricetag-outline"
                  selectedValue={values.planoId}
                  onValueChange={pick('planoId')}
                  options={options.plans}
                  error={errors.planoId}
                  touched={touched.planoId}
                />
                <PickerField
                  label={t('students.status')}
                  icon="pulse-outline"
                  selectedValue={values.status}
                  onValueChange={pick('status')}
                  options={options.status}
                  error={errors.status}
                  touched={touched.status}
                />
                <PickerField
                  label={`${t('students.workout')} (${t('common.optional')})`}
                  icon="barbell-outline"
                  selectedValue={values.treinoId}
                  onValueChange={pick('treinoId')}
                  options={options.workouts}
                  placeholder={t('students.noWorkout')}
                />
                <AppInput
                  label={`${t('students.notes')} (${t('common.optional')})`}
                  placeholder={t('students.notesPlaceholder')}
                  value={values.observacoes}
                  onChangeText={handleChange('observacoes')}
                  multiline
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
