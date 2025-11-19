import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Lock, Trophy, Star, Play, Sparkles, Zap } from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LockedChallengeModal from '@/components/LockedChallengeModal';

export default function QuizzesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { progress, isQuizUnlocked } = useProgress();
  const [lockedCategory, setLockedCategory] = React.useState<{
    title: string;
    requiredPoints: number;
    color: string;
  } | null>(null);

  // Generate styles from theme
  const styles = React.useMemo(() => createQuizzesStyles(theme), [theme]);

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
          <Trophy size={18} color={theme.colors.textInverse} />
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
                  if (!unlocked) {
                    // Haptic feedback for locked category
                    if (Platform.OS !== 'web') {
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    }
                    // Show custom modal
                    setLockedCategory({
                      title: category.title,
                      requiredPoints: category.requiredPoints,
                      color: category.color,
                    });
                    return;
                  }
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  router.push(`/category/${category.id}`);
                }}
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

      {/* Locked Challenge Modal */}
      <LockedChallengeModal
        visible={lockedCategory !== null}
        onClose={() => setLockedCategory(null)}
        categoryTitle={lockedCategory?.title || ''}
        requiredPoints={lockedCategory?.requiredPoints || 0}
        currentPoints={progress.totalPoints}
        categoryColor={lockedCategory?.color || '#8B9F99'}
      />
    </View>
  );
}


const createQuizzesStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },

  headerTitle: {
    fontSize: 28,
    color: theme.colors.textInverse,
    fontFamily: 'Inter_900Black',
  },

  pointsBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 1,
  },

  pointsText: {
    color: theme.colors.textInverse,
    fontWeight: '700' as const,
  },

  gridContainer: {
    padding: 16,
  },

  grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    rowGap: 16,
  },

  card: {
    width: '48%',
    borderRadius: 1,
    padding: 18,
    minHeight: 160,
    justifyContent: 'space-between' as const,
    overflow: 'hidden' as const,

    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    //elevation: 8,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  cardLocked: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },

  cardPressed: {
    transform: [{ scale: 0.95 }],
    shadowOpacity: 0.15,
  },

  topRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },

  icon: {
    fontSize: 34,
  },

  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '800' as const,
    color: theme.colors.textInverse,
  },

  subText: {
    fontSize: 14,
    marginTop: 4,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  lockedText: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.error,
    fontWeight: '600' as const,
  },
});
