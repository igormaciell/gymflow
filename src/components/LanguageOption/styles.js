import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadow,
  },
  cardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  flag: {
    fontSize: 32,
  },
  texts: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: 2,
  },
});
