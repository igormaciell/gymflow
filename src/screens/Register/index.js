import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Formik } from 'formik';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import SwitchField from '../../components/SwitchField';
import styles from './styles';
import { ROLES } from '../../constants/options';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateRegister } from '../../utils/validators';
import { maskPhone } from '../../utils/format';
import { safeGoBack } from '../../utils/navigation';

const INITIAL_VALUES = {
  nome: '',
  email: '',
  telefone: '',
  cargo: '',
  senha: '',
  confirmarSenha: '',
  termos: false,
};

// Cadastro de usuários: TODOS os campos são validados pelo Formik (validateRegister)
export default function RegisterScreen({ navigation }) {
  const { t } = useLanguage();
  const { register } = useAuth();
  const { showToast } = useToast();

  const roleOptions = ROLES.map((role) => ({ label: t(`roles.${role}`), value: role }));

  const handleRegister = async (values, { setFieldError }) => {
    try {
      const created = await register(values);
      // Volta para o login passando parâmetros (popTo retorna à tela já existente na pilha)
      navigation.popTo('Login', { registered: true, email: created.email });
    } catch (error) {
      if (error.code === 'auth.emailInUse') setFieldError('email', 'auth.emailInUse');
      else showToast(t(error.code || 'errors.generic'), 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('auth.registerTitle')}</Text>
        <Text style={styles.subtitle}>{t('auth.registerSubtitle')}</Text>

        <Formik
          initialValues={INITIAL_VALUES}
          validate={validateRegister}
          onSubmit={handleRegister}
        >
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
                label={t('auth.name')}
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
                label={t('auth.email')}
                icon="mail-outline"
                placeholder={t('auth.emailPlaceholder')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AppInput
                label={t('auth.phone')}
                icon="call-outline"
                placeholder={t('auth.phonePlaceholder')}
                value={values.telefone}
                onChangeText={(text) => setFieldValue('telefone', maskPhone(text))}
                onBlur={handleBlur('telefone')}
                error={errors.telefone}
                touched={touched.telefone}
                keyboardType="phone-pad"
              />
              <PickerField
                label={t('auth.role')}
                icon="briefcase-outline"
                selectedValue={values.cargo}
                onValueChange={(value) => {
                  setFieldValue('cargo', value);
                  setFieldTouched('cargo', true, false);
                }}
                options={roleOptions}
                error={errors.cargo}
                touched={touched.cargo}
              />
              <AppInput
                label={t('auth.password')}
                icon="lock-closed-outline"
                placeholder={t('auth.passwordPlaceholder')}
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                error={errors.senha}
                touched={touched.senha}
                secure
              />
              <AppInput
                label={t('auth.confirmPassword')}
                icon="shield-checkmark-outline"
                placeholder={t('auth.confirmPasswordPlaceholder')}
                value={values.confirmarSenha}
                onChangeText={handleChange('confirmarSenha')}
                onBlur={handleBlur('confirmarSenha')}
                error={errors.confirmarSenha}
                touched={touched.confirmarSenha}
                secure
              />
              <SwitchField
                label={t('auth.acceptTerms')}
                value={values.termos}
                onValueChange={(value) => {
                  setFieldValue('termos', value);
                  setFieldTouched('termos', true, false);
                }}
                error={errors.termos}
                touched={touched.termos}
              />
              <AppButton
                title={t('auth.registerButton')}
                icon="person-add-outline"
                onPress={handleSubmit}
                loading={isSubmitting}
              />
              <AppButton
                title={t('auth.haveAccount')}
                variant="ghost"
                onPress={() => safeGoBack(navigation, 'Login')}
                style={styles.backButton}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
