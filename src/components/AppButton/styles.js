import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: fontSize.body,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textSmall: {
    fontSize: fontSize.small,
  },
  disabled: {
    opacity: 0.55,
  },
});

export const variantStyles = {
  primary: StyleSheet.create({
    container: { backgroundColor: colors.accentDark },
    text: { color: colors.textOnPrimary },
  }),
  secondary: StyleSheet.create({
    container: { backgroundColor: colors.primary },
    text: { color: colors.textOnPrimary },
  }),
  outline: StyleSheet.create({
    container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
    text: { color: colors.primary },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: colors.danger },
    text: { color: colors.textOnPrimary },
  }),
  ghost: StyleSheet.create({
    container: { backgroundColor: 'transparent' },
    text: { color: colors.accentDark },
  }),
};

export default styles;
