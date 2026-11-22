import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export const toastColors = {
  success: colors.success,
  error: colors.danger,
  info: colors.primary,
};

export default StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    pointerEvents: 'none',
  },
  text: {
    flex: 1,
    marginLeft: spacing.sm,
    color: '#FFFFFF',
    fontSize: fontSize.small,
    fontWeight: '600',
  },
});
