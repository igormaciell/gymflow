import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../constants/theme';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingRight: spacing.md,
    paddingLeft: spacing.md + 4,
    marginBottom: spacing.sm + 4,
    overflow: 'hidden',
    ...shadow,
  },
  stripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  level: {
    marginLeft: spacing.sm,
    fontSize: fontSize.caption,
    fontWeight: '600',
    color: colors.textMuted,
  },
  meta: {
    marginLeft: 4,
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  metaIcon: {
    marginLeft: spacing.md,
  },
});
