import { useProgress } from '@/contexts/ProgressContext';
import { useUser } from '@/contexts/UserContext';
import { quizzes } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Clock, Trophy, Zap } from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/home.styles';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress, isQuizUnlocked } = useProgress();
  const { profile } = useUser();

  const handleQuizPress = (quizId: string, requiredPoints: number) => {
    if (!isQuizUnlocked(requiredPoints)) {
      return;
    }

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push(`/quiz/${quizId}` as never);
  };

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = quizzes.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <View style={[styles.avatarSmall, { backgroundColor: profile.avatar.backgroundColor }]}>
            <Text style={styles.avatarEmojiSmall}>{profile.avatar.emoji}</Text>
          </View>
          <View>
            <Text style={styles.greetingText}>Salut,</Text>
            <Text style={styles.userName}>{profile.name}</Text>
          </View>
        </View>

        <View style={styles.pointsBadge}>
          <Trophy size={18} color="#FFD700" />
          <Text style={styles.pointsText}>{progress.totalPoints} pts</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Vos statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Trophy size={24} color="#FFD700" />
              </View>
              <Text style={styles.statValue}>{progress.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Zap size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{completedQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz complétés</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Clock size={24} color="#10B981" />
              </View>
              <Text style={styles.statValue}>{totalQuizzes - completedQuizzes}</Text>
              <Text style={styles.statLabel}>À découvrir</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>

          {quizzes.map((quiz) => {
            const unlocked = isQuizUnlocked(quiz.requiredPoints);
            const result = progress.quizResults[quiz.id];

            return (
              <Pressable
                key={quiz.id}
                style={({ pressed }) => [
                  styles.quizCard,
                  !unlocked && styles.quizCardLocked,
                  pressed && unlocked && styles.quizCardPressed,
                ]}
                onPress={() => handleQuizPress(quiz.id, quiz.requiredPoints)}
                disabled={!unlocked}
              >
                <View style={[styles.quizIconContainer, { backgroundColor: quiz.color }]}>
                  <Text style={styles.quizIcon}>{quiz.icon}</Text>
                </View>

                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  {unlocked ? (
                    result ? (
                      <View style={styles.quizStats}>
                        <Text style={styles.quizStatsText}>
                          Score: {result.score}/{result.totalQuestions}
                        </Text>
                        <Text style={styles.badge}>
                          {result.badge === 'platinum' && '💎'}
                          {result.badge === 'gold' && '🥇'}
                          {result.badge === 'silver' && '🥈'}
                          {result.badge === 'bronze' && '🥉'}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.quizQuestions}>{quiz.questions.length} questions</Text>
                    )
                  ) : (
                    <Text style={styles.quizLocked}>🔒 {quiz.requiredPoints} pts requis</Text>
                  )}
                </View>

                {unlocked && !result && (
                  <View style={styles.playButton}>
                    <Zap size={20} color="#FFFFFF" fill="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}


