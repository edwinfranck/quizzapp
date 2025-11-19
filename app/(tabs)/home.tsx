import { useProgress } from '@/contexts/ProgressContext';
import { useUser } from '@/contexts/UserContext';
import { categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Clock, Trophy, Zap, Sparkles, Star, Lock, Play } from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/home.styles';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress, isQuizUnlocked } = useProgress();
  const { profile } = useUser();

  const handleQuizPress = (quizId: string, requiredPoints: number) => {
    if (!isQuizUnlocked(requiredPoints)) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push(`/quiz/${quizId}` as never);
  };

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = categories.reduce((acc, cat) => acc + cat.quizzes.length, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <View style={[styles.avatarSmall]}>
            <Image source={profile.avatar.image} style={styles.avatarImage} />
          </View>
          <View>
            <Text style={styles.greetingText}>Repos,</Text>
            <Text style={styles.userName}>{profile.name}</Text>
          </View>
        </View>

        <View style={styles.pointsBadge}>
          <Trophy size={18} color="#29392E" />
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
                <Trophy size={24} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{progress.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Zap size={24} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{completedQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz complétés</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Clock size={24} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{totalQuizzes - completedQuizzes}</Text>
              <Text style={styles.statLabel}>À découvrir</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>

          {categories.map((category) => {
            const unlocked = isQuizUnlocked(category.requiredPoints);
            const totalQuestions = category.quizzes.reduce((acc, q) => acc + q.questions.length, 0);
            const totalQuizzes = category.quizzes.length;

            return (
              <Pressable
                key={category.id}
                style={({ pressed }) => [
                  styles.quizCard,
                  !unlocked && styles.quizCardLocked,
                  pressed && unlocked && styles.quizCardPressed,
                ]}
                onPress={() => {
                  if (!unlocked) return;
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  router.push(`/category/${category.id}` as never);
                }}
                disabled={!unlocked}
              >
                {/* Icone gauche */}
                <View style={[styles.quizIconContainer, { backgroundColor: category.color }]}>
                  <Text style={styles.quizIcon}>{category.icon}</Text>
                </View>

                {/* Infos */}
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{category.title}</Text>

                  <View style={styles.quizStatsRow}>
                    {unlocked ? (
                      <Text style={styles.quizQuestions}>{totalQuizzes} quiz • {totalQuestions} questions</Text>
                    ) : (
                      <Text style={styles.quizLocked}>{category.requiredPoints} points requis</Text>
                    )}
                  </View>
                </View>

                {/* Icone droite */}
                <View style={styles.playButton}>
                  {unlocked ? (
                    <Play size={18} color="#8B9F99" />
                  ) : (
                    <Lock size={18} color="#8B9F99" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
