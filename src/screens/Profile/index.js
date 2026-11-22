import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Formik } from 'formik';
import Avatar from '../../components/Avatar';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import PickerField from '../../components/PickerField';
import InfoRow from '../../components/InfoRow';
import SectionHeader from '../../components/SectionHeader';
import ConfirmModal from '../../components/ConfirmModal';
import styles from './styles';
import { colors } from '../../constants/theme';
import { ROLES } from '../../constants/options';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { validateProfile } from '../../utils/validators';
import { formatDate, maskPhone } from '../../utils/format';

// Perfil do usuário logado: dados da conta e edição de nome, telefone e cargo
export default function ProfileScreen() {
  const { t, locale } = useLanguage();
  const { showToast } = useToast();
  const { user, updateProfile, logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  if (!user) return null;

  const { nome, email, telefone, cargo, criadoEm } = user;
  const roleOptions = ROLES.map((value) => ({ label: t(`roles.${value}`), value }));

  const handleSave = async (values) => {
    try {
      await updateProfile({
        nome: values.nome.trim(),
        telefone: values.telefone,
        cargo: values.cargo,
      });
      showToast(t('profile.saved'));
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
        <View style={styles.hero}>
          <Avatar name={nome} size={80} color={colors.accent} />
          <Text style={styles.name}>{nome}</Text>
          <Text style={styles.role}>{t(`roles.${cargo}`)}</Text>
          <Text style={styles.since}>
            {t('profile.memberSince', { date: formatDate(criadoEm, locale) })}
          </Text>
        </View>

        <SectionHeader title={t('profile.account')} />
        <View style={styles.card}>
          <InfoRow icon="mail-outline" label={t('auth.email')} value={email} />
          <InfoRow
            icon="language-outline"
            label={t('menu.language')}
            value={t(`language.native.${locale}`)}
            last
          />
        </View>

        <SectionHeader title={t('profile.editInfo')} />
        <Formik
          initialValues={{ nome, telefone, cargo }}
          validate={validateProfile}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            dirty,
          }) => (
            <View style={styles.card}>
              <View style={styles.formInner}>
                <AppInput
                  label={t('auth.name')}
                  icon="person-outline"
                  value={values.nome}
                  onChangeText={handleChange('nome')}
                  onBlur={handleBlur('nome')}
                  error={errors.nome}
                  touched={touched.nome}
                />
                <AppInput
                  label={t('auth.phone')}
                  icon="call-outline"
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
                  onValueChange={(value) => setFieldValue('cargo', value)}
                  options={roleOptions}
                  error={errors.cargo}
                  touched={touched.cargo}
                />
                <AppButton
                  title={t('common.save')}
                  icon="checkmark"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={!dirty}
                />
              </View>
            </View>
          )}
        </Formik>

        <AppButton
          title={t('menu.logout')}
          icon="log-out-outline"
          variant="outline"
          onPress={() => setConfirmLogout(true)}
          style={styles.logout}
        />
      </ScrollView>

      <ConfirmModal
        visible={confirmLogout}
        title={t('menu.logoutTitle')}
        message={t('menu.logoutMessage')}
        confirmLabel={t('menu.logout')}
        icon="log-out-outline"
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => {
          setConfirmLogout(false);
          logout();
        }}
      />
    </KeyboardAvoidingView>
  );
}
