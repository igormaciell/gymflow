import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.caption,
    marginTop: 4,
    fontWeight: '500',
  },
});
