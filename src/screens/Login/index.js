import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateLogin } from '../../utils/validators';
import { safeNavigate } from '../../utils/navigation';

const DEMO = { email: 'admin@gymflow.com', senha: '123456' };

export default function LoginScreen({ navigation, route }) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [authError, setAuthError] = useState(null);
  const formRef = useRef(null);

  // Parâmetros recebidos da tela de cadastro (desestruturação dos params da rota)
  const { registered, email: registeredEmail } = route.params || {};

  // Efeito colateral: ao voltar do cadastro, avisa o usuário e preenche o e-mail
  useEffect(() => {
    if (registered) {
      showToast(t('auth.registerSuccess'));
      // Limpa erros anteriores e já deixa o e-mail cadastrado preenchido
      if (formRef.current) {
        formRef.current.resetForm({ values: { email: registeredEmail || '', senha: '' } });
      }
      setAuthError(null);
      navigation.setParams({ registered: undefined, email: undefined });
    }
  }, [registered, registeredEmail, navigation, showToast, t]);

  const handleLogin = async ({ email, senha }) => {
    setAuthError(null);
    try {
      await login(email, senha);
    } catch (error) {
      setAuthError(error.code || 'errors.generic');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AuthHeader title={t('auth.welcome')} subtitle={t('auth.subtitle')} />

        <View style={styles.card}>
          <Formik
            innerRef={formRef}
            initialValues={{ email: '', senha: '' }}
            validate={validateLogin}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setValues,
            }) => (
              <>
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
                  autoComplete="email"
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
                  onSubmitEditing={handleSubmit}
                />

                {authError && (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle" size={18} color={colors.danger} />
                    <Text style={styles.errorText}>{t(authError)}</Text>
                  </View>
                )}

                <AppButton
                  title={t('auth.login')}
                  icon="log-in-outline"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                />

                <TouchableOpacity
                  style={styles.demo}
                  onPress={() => setValues(DEMO)}
                  hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
                  accessibilityRole="button"
                >
                  <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
                  <Text style={styles.demoText}>{t('auth.demo')}</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>{t('auth.noAccount')}</Text>
          <TouchableOpacity
            onPress={() => safeNavigate(navigation, 'Register')}
            hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            accessibilityRole="link"
          >
            <Text style={styles.registerLink}>{t('auth.createAccount')}</Text>
          </TouchableOpacity>
        </View>

        <LanguageSwitcher />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
