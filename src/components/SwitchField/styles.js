import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  label: {
    flex: 1,
    fontSize: fontSize.small,
    color: colors.text,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.caption,
    marginTop: 4,
    fontWeight: '500',
  },
});
