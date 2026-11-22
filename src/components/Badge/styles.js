import { StyleSheet } from 'react-native';
import { colors, fontSize, radius } from '../../constants/theme';

export const badgeColors = {
  success: { backgroundColor: colors.successSoft, color: colors.success },
  warning: { backgroundColor: colors.warningSoft, color: colors.warning },
  danger: { backgroundColor: colors.dangerSoft, color: colors.danger },
  accent: { backgroundColor: colors.accentSoft, color: colors.accentDark },
  neutral: { backgroundColor: '#ECEFF5', color: colors.primary },
};

export default StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text: {
    fontSize: fontSize.caption,
    fontWeight: '700',
  },
});
