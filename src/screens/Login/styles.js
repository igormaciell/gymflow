import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginTop: -spacing.lg,
    ...shadow,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.sm,
    padding: spacing.sm + 4,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.danger,
    marginLeft: spacing.sm,
    fontSize: fontSize.small,
    fontWeight: '600',
    flex: 1,
  },
  demo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  demoText: {
    marginLeft: 6,
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    color: colors.textMuted,
    fontSize: fontSize.body,
  },
  registerLink: {
    color: colors.accentDark,
    fontWeight: '800',
    fontSize: fontSize.body,
    marginLeft: 6,
  },
});
