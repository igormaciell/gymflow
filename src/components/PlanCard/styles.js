import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderTopWidth: 4,
    borderTopColor: colors.accent,
    ...shadow,
  },
  cardInactive: {
    borderTopColor: colors.textMuted,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBox: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 6,
  },
  badges: {
    flexDirection: 'row',
  },
  spacer: {
    width: spacing.sm,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: fontSize.subtitle,
    fontWeight: '800',
    color: colors.accentDark,
  },
  monthly: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  description: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: spacing.sm + 4,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  students: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentsText: {
    marginLeft: 6,
    fontSize: fontSize.small,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
  },
});
