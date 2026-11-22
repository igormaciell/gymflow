import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemDone: {
    backgroundColor: colors.successSoft,
    borderColor: colors.successSoft,
  },
  number: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberDone: {
    backgroundColor: colors.success,
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  texts: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  nameDone: {
    textDecorationLine: 'line-through',
    color: colors.success,
  },
  meta: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: 2,
  },
});
