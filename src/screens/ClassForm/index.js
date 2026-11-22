import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import ErrorView from '../../components/ErrorView';
import styles from './styles';
import { MODALITIES, WEEK_DAYS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateClass } from '../../utils/validators';
import { maskTime } from '../../utils/format';
import { safeGoBack } from '../../utils/navigation';

const EMPTY = {
  modalidade: '',
  instrutor: '',
  dia: '',
  horario: '',
  duracao: '60',
  vagas: '20',
  inscritos: '0',
  sala: '',
};

// Cadastro e edição de aulas coletivas
export default function ClassFormScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { getById, createItem, updateItem } = useData();
  const { id } = route.params || {};
  const aula = id ? getById('aulas', id) : null;
  const isEdit = Boolean(id);

  useEffect(() => {
    navigation.setOptions({ title: t(isEdit ? 'screens.editClass' : 'screens.newClass') });
  }, [navigation, isEdit, t]);

  if (isEdit && !aula) {
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  const initialValues = aula
    ? {
        ...aula,
        duracao: String(aula.duracao),
        vagas: String(aula.vagas),
        inscritos: String(aula.inscritos),
      }
    : EMPTY;

  const modalityOptions = MODALITIES.map((value) => ({ label: t(`modalities.${value}`), value }));
  const dayOptions = WEEK_DAYS.map((value) => ({ label: t(`days.${value}`), value }));

  const handleSave = async (values) => {
    const { modalidade, instrutor, dia, horario, duracao, vagas, inscritos, sala } = values;
    const payload = {
      modalidade,
      instrutor: instrutor.trim(),
      dia,
      horario,
      duracao: Number(duracao),
      vagas: Number(vagas),
      inscritos: Number(inscritos),
      sala: sala.trim(),
    };
    try {
      if (isEdit) await updateItem('aulas', id, payload);
      else await createItem('aulas', payload);
      showToast(t('classes.saved'));
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
        <Formik initialValues={initialValues} validate={validateClass} onSubmit={handleSave}>
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
            const pick = (field) => (value) => {
              setFieldValue(field, value);
              setFieldTouched(field, true, false);
            };
            const numberInput = (field) => ({
              value: values[field],
              onChangeText: (text) => setFieldValue(field, text.replace(/\D/g, '')),
              onBlur: handleBlur(field),
              error: errors[field],
              touched: touched[field],
              keyboardType: 'number-pad',
              maxLength: 3,
            });

            return (
              <View style={styles.card}>
                <PickerField
                  label={t('classes.modality')}
                  icon="bicycle-outline"
                  selectedValue={values.modalidade}
                  onValueChange={pick('modalidade')}
                  options={modalityOptions}
                  error={errors.modalidade}
                  touched={touched.modalidade}
                />
                <AppInput
                  label={t('classes.instructor')}
                  icon="person-outline"
                  placeholder={t('classes.instructorPlaceholder')}
                  value={values.instrutor}
                  onChangeText={handleChange('instrutor')}
                  onBlur={handleBlur('instrutor')}
                  error={errors.instrutor}
                  touched={touched.instrutor}
                  autoCapitalize="words"
                />
                <PickerField
                  label={t('classes.day')}
                  icon="calendar-outline"
                  selectedValue={values.dia}
                  onValueChange={pick('dia')}
                  options={dayOptions}
                  error={errors.dia}
                  touched={touched.dia}
                />
                <AppInput
                  label={t('classes.time')}
                  icon="alarm-outline"
                  placeholder={t('classes.timePlaceholder')}
                  value={values.horario}
                  onChangeText={(text) => setFieldValue('horario', maskTime(text))}
                  onBlur={handleBlur('horario')}
                  error={errors.horario}
                  touched={touched.horario}
                  keyboardType="number-pad"
                />
                <AppInput
                  label={t('classes.duration')}
                  icon="time-outline"
                  {...numberInput('duracao')}
                />
                <View style={styles.row}>
                  <AppInput
                    label={t('classes.capacity')}
                    icon="people-outline"
                    style={styles.half}
                    {...numberInput('vagas')}
                  />
                  <AppInput
                    label={t('classes.enrolled')}
                    icon="person-add-outline"
                    style={styles.half}
                    {...numberInput('inscritos')}
                  />
                </View>
                <AppInput
                  label={t('classes.room')}
                  icon="location-outline"
                  placeholder={t('classes.roomPlaceholder')}
                  value={values.sala}
                  onChangeText={handleChange('sala')}
                  onBlur={handleBlur('sala')}
                  error={errors.sala}
                  touched={touched.sala}
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
