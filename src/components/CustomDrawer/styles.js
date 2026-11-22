import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    paddingTop: 0,
  },
  header: {
    paddingTop: spacing.xl + spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    marginBottom: spacing.sm,
  },
  name: {
    color: colors.textOnPrimary,
    fontSize: fontSize.subtitle,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  email: {
    color: '#C9D1E3',
    fontSize: fontSize.small,
    marginTop: 2,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(232, 93, 4, 0.18)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: spacing.sm,
  },
  roleText: {
    color: colors.accent,
    fontSize: fontSize.caption,
    fontWeight: '700',
  },
  menu: {
    paddingTop: spacing.xs,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingVertical: spacing.md,
  },
  languageInfo: {
    color: '#C9D1E3',
    fontSize: fontSize.caption,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs,
  },
});
