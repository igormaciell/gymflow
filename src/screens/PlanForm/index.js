import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import SwitchField from '../../components/SwitchField';
import ErrorView from '../../components/ErrorView';
import styles from './styles';
import { PLAN_PERIODS } from '../../constants/options';
import { useData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { toNumber, validatePlan } from '../../utils/validators';
import { safeGoBack } from '../../utils/navigation';

const EMPTY = { nome: '', preco: '', periodo: '', descricao: '', ativo: true };

// Cadastro e edição de planos
export default function PlanFormScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { getById, createItem, updateItem } = useData();
  const { id } = route.params || {};
  const plan = id ? getById('planos', id) : null;
  const isEdit = Boolean(id);

  useEffect(() => {
    navigation.setOptions({ title: t(isEdit ? 'screens.editPlan' : 'screens.newPlan') });
  }, [navigation, isEdit, t]);

  if (isEdit && !plan) {
    return (
      <ErrorView
        message={t('errors.notFoundMessage')}
        actionLabel={t('common.back')}
        onAction={() => safeGoBack(navigation)}
      />
    );
  }

  const initialValues = plan ? { ...plan, preco: String(plan.preco).replace('.', ',') } : EMPTY;

  const periodOptions = PLAN_PERIODS.map((value) => ({ label: t(`periods.${value}`), value }));

  const handleSave = async ({ nome, preco, periodo, descricao, ativo }) => {
    const payload = {
      nome: nome.trim(),
      preco: toNumber(preco),
      periodo,
      descricao: descricao.trim(),
      ativo,
    };
    try {
      if (isEdit) await updateItem('planos', id, payload);
      else await createItem('planos', payload);
      showToast(t('plans.saved'));
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
        <Formik initialValues={initialValues} validate={validatePlan} onSubmit={handleSave}>
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
          }) => (
            <View style={styles.card}>
              <AppInput
                label={t('plans.name')}
                icon="pricetag-outline"
                placeholder={t('plans.namePlaceholder')}
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                error={errors.nome}
                touched={touched.nome}
              />
              <AppInput
                label={t('plans.price')}
                icon="cash-outline"
                placeholder={t('plans.pricePlaceholder')}
                value={values.preco}
                onChangeText={(text) => setFieldValue('preco', text.replace(/[^\d.,]/g, ''))}
                onBlur={handleBlur('preco')}
                error={errors.preco}
                touched={touched.preco}
                keyboardType="decimal-pad"
              />
              <PickerField
                label={t('plans.period')}
                icon="time-outline"
                selectedValue={values.periodo}
                onValueChange={(value) => {
                  setFieldValue('periodo', value);
                  setFieldTouched('periodo', true, false);
                }}
                options={periodOptions}
                error={errors.periodo}
                touched={touched.periodo}
              />
              <AppInput
                label={t('plans.description')}
                placeholder={t('plans.descriptionPlaceholder')}
                value={values.descricao}
                onChangeText={handleChange('descricao')}
                onBlur={handleBlur('descricao')}
                error={errors.descricao}
                touched={touched.descricao}
                multiline
              />
              <SwitchField
                label={t('plans.active')}
                value={values.ativo}
                onValueChange={(value) => setFieldValue('ativo', value)}
              />
              <AppButton
                title={t('common.save')}
                icon="checkmark"
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
