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
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: fontSize.title,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  heroRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  heroChipText: {
    color: '#FFFFFF',
    fontSize: fontSize.caption,
    fontWeight: '700',
  },
  description: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: fontSize.small,
    marginTop: spacing.md,
    lineHeight: 20,
  },
  using: {
    color: '#FFFFFF',
    opacity: 0.85,
    fontSize: fontSize.caption,
    marginTop: spacing.sm,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    ...shadow,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressTitle: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  progressValue: {
    fontSize: fontSize.body,
    fontWeight: '800',
    color: colors.accentDark,
  },
  hint: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  completedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  reset: {
    color: colors.accentDark,
    fontWeight: '700',
    fontSize: fontSize.small,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  gap: {
    width: spacing.sm + 4,
  },
});
