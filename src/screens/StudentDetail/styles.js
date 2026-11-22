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
    textAlign: 'center',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  heroMeta: {
    color: '#C9D1E3',
    marginLeft: spacing.sm,
    fontSize: fontSize.small,
  },
  since: {
    color: '#9AA6C2',
    fontSize: fontSize.caption,
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: spacing.md,
    marginHorizontal: -spacing.xs,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    marginHorizontal: spacing.xs,
    ...shadow,
  },
  statValue: {
    fontSize: fontSize.subtitle,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xs,
  },
  statValueSmall: {
    fontSize: fontSize.small,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    ...shadow,
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
