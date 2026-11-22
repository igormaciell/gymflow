import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: fontSize.title,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    color: '#C9D1E3',
    fontSize: fontSize.small,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: fontSize.caption,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    ...shadow,
  },
  previewMenu: {
    fontSize: fontSize.caption,
    fontWeight: '700',
    color: colors.accentDark,
  },
  previewText: {
    fontSize: fontSize.body,
    color: colors.text,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  previewButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentDark,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },
  previewButtonText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
  },
});
