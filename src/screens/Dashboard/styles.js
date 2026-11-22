import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.hero,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  revenueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  revenueIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: 'rgba(232, 93, 4, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueTexts: {
    flex: 1,
    marginLeft: spacing.md,
  },
  revenueLabel: {
    color: '#C9D1E3',
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  revenueValue: {
    color: colors.textOnPrimary,
    fontSize: fontSize.hero,
    fontWeight: '900',
    marginTop: 2,
  },
  revenueHint: {
    color: '#9AA6C2',
    fontSize: fontSize.caption,
    marginTop: 2,
  },
  sourceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  sourceText: {
    marginLeft: 6,
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
});
