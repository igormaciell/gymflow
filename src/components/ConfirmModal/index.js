import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../AppButton';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Diálogo de confirmação (funciona no Android, iOS e Web - o Alert nativo não funciona na Web)
export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  danger = true,
  loading = false,
  icon = 'warning-outline',
}) {
  const { t } = useLanguage();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.dialog} accessibilityRole="alert">
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: danger ? colors.dangerSoft : colors.accentSoft },
            ]}
          >
            <Ionicons name={icon} size={28} color={danger ? colors.danger : colors.accentDark} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <AppButton
              title={t('common.cancel')}
              variant="outline"
              onPress={onCancel}
              disabled={loading}
              style={styles.button}
            />
            <View style={styles.gap} />
            <AppButton
              title={confirmLabel || t('common.confirm')}
              variant={danger ? 'danger' : 'primary'}
              onPress={onConfirm}
              loading={loading}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
