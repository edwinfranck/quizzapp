import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getBadgeColor, getBadgeEmoji, categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlarmClock, Home, RotateCcw, Sparkles, Star, Trophy, Zap } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResultsScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { getQuizResult } = useProgress();

  const quiz = categories.flatMap(cat => cat.quizzes).find((q) => q.id === quizId);
  const result = getQuizResult(quizId || '');

  // Generate styles from theme
  const styles = React.useMemo(() => createResultsStyles(theme), [theme]);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    Array.from({ length: 20 }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    if (result && result.badge === 'platinum') {
      confettiAnims.forEach((anim, index) => {
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = Math.random() * 600 + 200;
        const randomRotate = Math.random() * 720;

        Animated.parallel([
          Animated.timing(anim.x, {
            toValue: randomX,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.y, {
            toValue: randomY,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: randomRotate,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [result, scaleAnim, fadeAnim, confettiAnims]);

  if (!quiz || !result) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Résultat non trouvé</Text>
      </View>
    );
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const badgeColor = getBadgeColor(result.badge);
  const badgeEmoji = getBadgeEmoji(result.badge);

  const handleRetry = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.back();
  };

  const handleHome = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/(tabs)/home');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const badgeConfig = {
    platinum: {
      icon: <Sparkles size={28} color="#8B9F99" />,
      text: "PARFAIT !"
    },
    gold: {
      icon: <Trophy size={28} color="#8B9F99" />,
      text: "Excellent !"
    },
    silver: {
      icon: <Star size={28} color="#8B9F99" />,
      text: "Bien joué !"
    },
    bronze: {
      icon: <Zap size={28} color="#8B9F99" fill="#8B9F99" />,
      text: "Bon effort !"
    }
  };




  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {result.badge === 'platinum' && (
        <View style={styles.confettiContainer}>
          {confettiAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.confetti,
                {
                  backgroundColor: ['#FFD700', '#FF6B6B', '#3B82F6', '#10B981'][
                    index % 4
                  ],
                  transform: [
                    { translateX: anim.x },
                    { translateY: anim.y },
                    {
                      rotate: anim.rotate.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      )}

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Quiz Terminé !</Text>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
        </View>

        <View style={[styles.badgeContainer, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeEmoji}>{badgeEmoji}</Text>
          <Text style={styles.badgeText}>
            {result.badge === 'platinum' && 'PARFAIT !'}
            {result.badge === 'gold' && 'Excellent !'}
            {result.badge === 'silver' && 'Bien joué !'}
            {result.badge === 'bronze' && 'Bon effort !'}
          </Text>
          {/* Icone droite 
          <View style={styles.badgeIcon}>
  {badgeConfig[result.badge].icon}
</View>

<Text style={styles.badgeText}>
  {badgeConfig[result.badge].text}
</Text>
*/}

        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={32} color="#335148" />
            <Text style={styles.statValue}>
              {result.score}/{result.totalQuestions}
            </Text>
            <Text style={styles.statLabel}>Réponses</Text>
          </View>

          <View style={styles.statCard}>
            <Trophy size={32} color="#335148" />
            <Text style={styles.percentageText}>{percentage}%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>

          <View style={styles.statCard}>
            <AlarmClock size={32} color="#335148" />
            <Text style={styles.timeText}>{formatTime(result.timeSpent)}</Text>
            <Text style={styles.statLabel}>Temps</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.retryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRetry}
          >
            <RotateCcw size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Réessayer</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.homeButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleHome}
          >
            <Home size={24} color="#1E293B" />
            <Text style={[styles.buttonText, styles.homeButtonText]}>
              Catégories
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}


const createResultsStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  confettiContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none' as const,
  },
  confetti: {
    position: 'absolute' as const,
    width: 10,
    height: 10,
    borderRadius: 5,
    top: 100,
    left: '50%' as const,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-around' as const,
  },
  header: {
    alignItems: 'center' as const,
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '800' as const,
    color: theme.colors.textInverse,
    textAlign: 'center' as const,
  },
  quizTitle: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
  badgeContainer: {
    padding: 32,
    borderRadius: 1,
    alignItems: 'center' as const,
    gap: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  badgeEmoji: {
    fontSize: 80,
  },
  badgeText: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: theme.colors.textInverse,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 1,
    alignItems: 'center' as const,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
  percentageText: {
    fontSize: 25,
    fontWeight: '800' as const,
    color: theme.colors.success,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: theme.colors.warning,
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 12,
    paddingVertical: 18,
    borderRadius: 1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  retryButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  homeButton: {
    backgroundColor: theme.colors.surface,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: theme.colors.textInverse,
  },
  homeButtonText: {
    color: theme.colors.text,
  },
  errorText: {
    color: theme.colors.textInverse,
    fontSize: 18,
    textAlign: 'center' as const,
  },
  badgeIcon: {
    marginBottom: 6,
  },
  badgeIconBox: {
    width: 50,
    height: 50,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 8,
  },
});
