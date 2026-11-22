import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filters: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    backgroundColor: colors.background,
  },
  pickers: {
    flexDirection: 'row',
    marginHorizontal: -spacing.xs,
  },
  count: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
