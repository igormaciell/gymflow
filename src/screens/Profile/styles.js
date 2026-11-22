import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  name: {
    color: colors.textOnPrimary,
    fontSize: fontSize.title,
    fontWeight: '800',
    marginTop: spacing.sm + 4,
  },
  role: {
    color: colors.accent,
    fontWeight: '700',
    marginTop: 2,
  },
  since: {
    color: '#9AA6C2',
    fontSize: fontSize.caption,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    ...shadow,
  },
  formInner: {
    paddingVertical: spacing.md,
  },
  logout: {
    marginTop: spacing.lg,
  },
});
