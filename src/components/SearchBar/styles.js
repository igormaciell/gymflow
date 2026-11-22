import { Platform, StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 46,
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: spacing.sm,
    fontSize: fontSize.body,
    color: colors.text,
    ...Platform.select({ web: { outlineStyle: 'none' }, default: {} }),
  },
});
