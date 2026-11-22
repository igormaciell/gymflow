import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  label: {
    width: 100,
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  track: {
    flex: 1,
    height: 14,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    overflow: 'hidden',
    marginHorizontal: spacing.sm,
  },
  bar: {
    height: '100%',
    borderRadius: radius.pill,
    minWidth: 4,
  },
  value: {
    minWidth: 28,
    textAlign: 'right',
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.text,
  },
});
