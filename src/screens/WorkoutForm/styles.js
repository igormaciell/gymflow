import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.caption,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  addButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
});
