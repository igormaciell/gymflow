import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: '30%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    margin: spacing.xs,
    ...shadow,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.text,
  },
  label: {
    fontSize: fontSize.caption,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
});
