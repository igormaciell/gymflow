import { StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl + spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  compact: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginRight: spacing.sm + 4,
  },
  brand: {
    fontSize: fontSize.hero,
    fontWeight: '900',
    color: colors.textOnPrimary,
    letterSpacing: 0.5,
  },
  brandAccent: {
    color: colors.accent,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: '#C9D1E3',
    marginTop: spacing.xs,
  },
});
