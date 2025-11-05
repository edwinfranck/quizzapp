import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B9F99',
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#7A9182',
  },
  greeting: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  avatarSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarEmojiSmall: {
    fontSize: 24,
  },
  greetingText: {
    fontSize: 14,
    color: '#29392E',
    fontWeight: '500' as const,
  },
  userName: {
    fontSize: 20,
    color: '#29392E',
    //fontWeight: '700' as const,
    fontFamily: 'Inter_900Black',
  },
  pointsBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: '#8B9F99',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: '#29392E',
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
    backgroundColor: '#7A9182',
    borderRadius: 4,
    padding: 20,
    borderWidth: 0,
    borderColor: '#334155',
  },
  statsTitle: {
    fontSize: 18,
    //fontWeight: '700' as const,
    fontFamily: 'Inter_900Black',
    color: '#29392E',
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
    borderRadius: 4,
    backgroundColor: '#29392E',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: '#29392E',
  },
  statLabel: {
    fontSize: 12,
    color: '#29392E',
    fontWeight: '600' as const,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    //fontWeight: '700' as const,
    fontFamily: 'Inter_900Black',
    color: '#29392E',
  },
  quizCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#7A9182',
    borderRadius: 4,
    padding: 16,
    gap: 16,
    borderWidth: 0,
    borderColor: '#334155',
  },
  quizCardLocked: {
    opacity: 0.5,
  },
  quizCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  quizIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 4,
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
    color: '#29392E',
  },
  quizQuestions: {
    fontSize: 14,
    color: '#29392E',
    fontWeight: '500' as const,
  },
  quizStats: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  quizStatsText: {
    fontSize: 14,
    color: '#29392E',
    fontWeight: '600' as const,
  },
  badge: {
    fontSize: 18,
  },
  quizLocked: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600' as const,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
});
