import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 6,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.sm + 4,
    marginVertical: 2,
    borderRadius: radius.md,
  },
  itemActive: {
    backgroundColor: colors.primaryLight,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  label: {
    marginLeft: spacing.md,
    fontSize: fontSize.body,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
  },
});
