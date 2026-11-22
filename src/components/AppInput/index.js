import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../constants/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Campo de texto com rótulo, ícone, mensagem de erro e opção de mostrar senha.
// "error" recebe a CHAVE de tradução devolvida pela validação do Formik.
export default function AppInput({
  label,
  icon,
  error,
  touched,
  secure = false,
  multiline = false,
  style,
  ...inputProps
}) {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(secure);
  const [focused, setFocused] = useState(false);
  const showError = Boolean(error && touched);

  const handleBlur = (event) => {
    setFocused(false);
    if (inputProps.onBlur) inputProps.onBlur(event);
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          multiline && styles.inputWrapperMultiline,
          focused && styles.inputFocused,
          showError && styles.inputError,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={showError ? colors.danger : focused ? colors.accent : colors.textMuted}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={colors.textMuted}
          {...inputProps}
          accessibilityLabel={label}
          multiline={multiline}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          style={[styles.input, multiline && styles.inputMultiline]}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setHidden((value) => !value)}
            accessibilityLabel={hidden ? t('auth.showPassword') : t('auth.hidePassword')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {showError && <Text style={styles.errorText}>{t(error)}</Text>}
    </View>
  );
}
