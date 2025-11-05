import { useProgress } from '@/contexts/ProgressContext';
import { quizzes } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Lock, Trophy, Star, Play, Sparkles, Zap } from 'lucide-react-native';
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

  const handlePress = (quizId: string, requiredPoints: number) => {
    if (!isQuizUnlocked(requiredPoints)) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push(`/quiz/${quizId}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>

        <View style={styles.pointsBadge}>
          <Trophy size={18} color="#29392E" />
          <Text style={styles.pointsText}>{progress.totalPoints} pts</Text>
        </View>
      </View>

      {/* GRID LIST */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.grid}>
          {quizzes.map((quiz) => {
            const unlocked = isQuizUnlocked(quiz.requiredPoints);
            const result = progress.quizResults[quiz.id];

            return (
              <Pressable
                key={quiz.id}
                onPress={() => handlePress(quiz.id, quiz.requiredPoints)}
                disabled={!unlocked}
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: quiz.color },
                  !unlocked && styles.cardLocked,
                  pressed && unlocked && styles.cardPressed,
                ]}
              >
                {/* TOP ROW : icon left + state icon right */}
                <View style={styles.topRow}>
                  <Text style={styles.icon}>{quiz.icon}</Text>

                  {unlocked ? (
                    result ? (
                      <>
                        {result.badge === 'platinum' && (
                          <Sparkles size={22} color="#FFF" />
                        )}
                        {result.badge === 'gold' && (
                          <Trophy size={22} color="#FFF" />
                        )}
                        {result.badge === 'silver' && (
                          <Star size={22} color="#FFF" />
                        )}
                        {result.badge === 'bronze' && (
                          <Zap size={22} color="#FFF" fill="#FFF" />
                        )}
                      </>
                    ) : (
                      <Play size={22} color="#FFF" />
                    )
                  ) : (
                    <Lock size={22} color="#FFF" />
                  )}
                </View>

                {/* TITLE */}
                <Text style={styles.title}>{quiz.title}</Text>

                {/* SUBTEXT */}
                {unlocked ? (
                  result ? (
                    <Text style={styles.subText}>
                      Score : {result.score}/{result.totalQuestions}
                    </Text>
                  ) : (
                    <Text style={styles.subText}>
                      {quiz.questions.length} questions
                    </Text>
                  )
                ) : (
                  <Text style={styles.lockedText}>
                    {quiz.requiredPoints} pts requis
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B9F99',
  },

  header: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: '#7A9182',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    //fontWeight: '900',
    color: '#29392E',
    fontFamily: 'Inter_900Black',
  },

  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#8B9F99',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  pointsText: {
    color: '#29392E',
    fontWeight: '700',
  },

  gridContainer: {
    padding: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },

  card: {
    width: '48%',
    borderRadius: 4,
    padding: 14,
    minHeight: 150,
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 0,
  },

  cardLocked: {
    opacity: 0.55,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    fontSize: 34,
  },

  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '800',
    color: '#FFF',
  },

  subText: {
    fontSize: 14,
    marginTop: 4,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },

  lockedText: {
    marginTop: 4,
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
});
