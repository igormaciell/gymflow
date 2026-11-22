import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    ...shadow,
  },
  timeBox: {
    width: 64,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  time: {
    color: colors.textOnPrimary,
    fontWeight: '800',
    fontSize: fontSize.body,
  },
  day: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: fontSize.caption,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  meta: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  capacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  capacityText: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  freeText: {
    fontSize: fontSize.caption,
    fontWeight: '700',
  },
});
