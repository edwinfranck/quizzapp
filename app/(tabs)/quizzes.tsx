import { useProgress } from '@/contexts/ProgressContext';
import { categories } from '@/data/quizzes';
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
          {categories.map((category) => {
            const unlocked = isQuizUnlocked(category.requiredPoints);
            // We can calculate a "category result" if we want, e.g. average score or completion
            // For now, we just show if it's unlocked and maybe how many quizzes inside.

            // Calculate total questions in category
            const totalQuestions = category.quizzes.reduce((acc, q) => acc + q.questions.length, 0);
            const totalQuizzes = category.quizzes.length;

            return (
              <Pressable
                key={category.id}
                onPress={() => {
                  if (!unlocked) return;
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  router.push(`/category/${category.id}`);
                }}
                disabled={!unlocked}
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: category.color },
                  !unlocked && styles.cardLocked,
                  pressed && unlocked && styles.cardPressed,
                ]}
              >
                {/* TOP ROW : icon left + state icon right */}
                <View style={styles.topRow}>
                  <Text style={styles.icon}>{category.icon}</Text>

                  {unlocked ? (
                    <Play size={22} color="#FFF" />
                  ) : (
                    <Lock size={22} color="#FFF" />
                  )}
                </View>

                {/* TITLE */}
                <Text style={styles.title}>{category.title}</Text>

                {/* SUBTEXT */}
                {unlocked ? (
                  <Text style={styles.subText}>
                    {totalQuizzes} quiz • {totalQuestions} questions
                  </Text>
                ) : (
                  <Text style={styles.lockedText}>
                    {category.requiredPoints} pts requis
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
