import { useProgress } from '@/contexts/ProgressContext';
import { quizzes } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Lock, Trophy } from 'lucide-react-native';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuizzesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress, isQuizUnlocked } = useProgress();

  const handleQuizPress = (quizId: string, requiredPoints: number) => {
    if (!isQuizUnlocked(requiredPoints)) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push(`/quiz/${quizId}` as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.pointsContainer}>
          <Trophy size={20} color="#29392E" />
          <Text style={styles.pointsText}>{progress.totalPoints} pts</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {quizzes.map((quiz) => {
          const unlocked = isQuizUnlocked(quiz.requiredPoints);
          const result = progress.quizResults[quiz.id];

          return (
            <Pressable
              key={quiz.id}
              onPress={() => handleQuizPress(quiz.id, quiz.requiredPoints)}
              disabled={!unlocked}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: quiz.color },
                !unlocked && styles.cardLocked,
                pressed && unlocked && styles.cardPressed,
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{quiz.icon}</Text>

                {!unlocked && (
                  <View style={styles.lockBadge}>
                    <Lock size={16} color="#FFF" />
                  </View>
                )}
              </View>

              <Text style={styles.cardTitle}>{quiz.title}</Text>

              {/* Quiz unlocked */}
              {unlocked ? (
                result ? (
                  <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>
                      ✓ {result.score}/{result.totalQuestions}
                    </Text>
                    <Text style={styles.badgeText}>
                      {result.badge === 'platinum' && '💎'}
                      {result.badge === 'gold' && '🥇'}
                      {result.badge === 'silver' && '🥈'}
                      {result.badge === 'bronze' && '🥉'}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.questionCount}>
                    {quiz.questions.length} questions
                  </Text>
                )
              ) : (
                <View style={styles.lockedInfo}>
                  <Text style={styles.requiredText}>
                    Débloquer avec {quiz.requiredPoints} pts
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B9F99',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
    backgroundColor: '#7A9182',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Inter_900Black',
    color: '#29392E',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#8B9F99',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: '#29392E',
    fontSize: 14,
    fontWeight: '700' as const,
  },

  /* LIST */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 18,
  },

  /* CARD */
  card: {
    borderRadius: 4,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardLocked: {
    opacity: 0.55,
    backdropFilter: 'blur(2px)', // web only, mobile ignore gracefully
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 44,
  },
  lockBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 8,
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },

  /* TEXT */
  questionCount: {
    marginTop: 4,
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statsText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '700',
  },
  badgeText: {
    fontSize: 24,
    marginLeft: 10,
  },

  lockedInfo: {
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.28)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  requiredText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
