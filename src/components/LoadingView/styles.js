import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
});
