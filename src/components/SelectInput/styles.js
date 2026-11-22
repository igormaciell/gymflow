import { Platform, StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    minHeight: 50,
    overflow: 'hidden',
  },
  compact: {
    minHeight: 44,
    borderRadius: radius.sm,
    paddingLeft: spacing.sm,
  },
  error: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  icon: {
    marginRight: spacing.xs,
  },
  picker: {
    flex: 1,
    minWidth: 0,
    color: colors.text,
    fontSize: fontSize.body,
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 40,
    // Remove o contorno de foco padrão do navegador (apenas Web)
    ...Platform.select({ web: { outlineStyle: 'none' }, default: {} }),
  },
  valueText: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  doneButton: {
    alignSelf: 'flex-end',
    padding: spacing.md,
  },
  doneText: {
    color: colors.accentDark,
    fontWeight: '700',
    fontSize: fontSize.body,
  },
});
