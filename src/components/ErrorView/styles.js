import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    margin: spacing.md,
  },
  compact: {
    flexDirection: 'row',
    padding: spacing.sm + 4,
    margin: 0,
    marginBottom: spacing.md,
  },
  message: {
    marginTop: spacing.sm,
    fontSize: fontSize.body,
    color: colors.danger,
    textAlign: 'center',
  },
  messageCompact: {
    flex: 1,
    marginTop: 0,
    marginLeft: spacing.sm,
    fontSize: fontSize.small,
    textAlign: 'left',
  },
  button: {
    marginTop: spacing.md,
  },
  buttonCompact: {
    marginLeft: spacing.sm,
  },
});
