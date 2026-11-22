import { Platform, StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm,
  },
  index: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '800',
    fontSize: fontSize.small,
    overflow: 'hidden',
  },
  fields: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: spacing.sm + 4,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.sm,
    fontSize: fontSize.small,
    color: colors.text,
    ...Platform.select({ web: { outlineStyle: 'none' }, default: {} }),
  },
  nameInput: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  numbers: {
    flexDirection: 'row',
  },
  numberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  smallLabel: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
    marginRight: 6,
  },
  numberInput: {
    width: 56,
    textAlign: 'center',
  },
  remove: {
    padding: 4,
  },
});
