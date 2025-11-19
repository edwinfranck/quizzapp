import { StyleSheet } from 'react-native';
import { Theme } from '@/types/theme';

export const createHomeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
  },
  greeting: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  avatarSmall: {
    width: 48,
    height: 48,
    borderRadius: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarEmojiSmall: {
    fontSize: 24,
  },
  greetingText: {
    fontSize: 14,
    color: theme.colors.textInverse,
    fontWeight: '500' as const,
  },
  userName: {
    fontSize: 20,
    color: theme.colors.textInverse,
    fontFamily: 'Inter_900Black',
  },
  pointsBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 1,
  },
  pointsText: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: '700' as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  statsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    //elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter_900Black',
    color: theme.colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  statItem: {
    alignItems: 'center' as const,
    gap: 8,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 1,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter_900Black',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter_900Black',
    color: theme.colors.text,
  },
  quizCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    //elevation: 2,
  },
  quizCardLocked: {
    opacity: 0.6,
  },
  quizCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  quizIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  quizIcon: {
    fontSize: 32,
  },
  quizInfo: {
    flex: 1,
    gap: 4,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },
  quizQuestions: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  quizStats: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  quizStatsRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: 8,
  },
  quizStatsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },
  badge: {
    fontSize: 18,
  },
  quizLocked: {
    fontSize: 14,
    color: theme.colors.error,
    fontWeight: '600' as const,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  infoBadge: {
    width: 28,
    height: 28,
    borderRadius: 1,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 1,
    resizeMode: 'cover' as const,
  },
});
