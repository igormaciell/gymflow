import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: '800',
    color: colors.primary,
  },
  action: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.accentDark,
  },
});
