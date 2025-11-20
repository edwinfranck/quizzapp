import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getBadge, categories } from '@/data/quizzes';
import { Question } from '@/types/quiz';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle2, Clock, XCircle, ArrowLeft, Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { saveQuizResult, progress } = useProgress();

  // in-progress helpers (save/restore partial quiz state)
  const { saveInProgress, loadInProgress, clearInProgress } = useProgress();

  const isFocused = useIsFocused();

  // Find quiz by searching through all categories
  let quiz = null;
  let categoryColor = '#8B9F99'; // Default color
  for (const category of categories) {
    const foundQuiz = category.quizzes.find((q) => q.id === id);
    if (foundQuiz) {
      quiz = foundQuiz;
      categoryColor = category.color;
      break;
    }
  }

  // Shuffle function to randomize question order
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // State for shuffled questions - initialized once when component mounts
  const [shuffledQuestions] = useState<Question[]>(() =>
    quiz ? shuffleArray(quiz.questions) : []
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // refs to always capture latest values for saving on unmount
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const selectedAnswerRef = useRef(selectedAnswer);
  const correctAnswersRef = useRef(correctAnswers);
  const timeElapsedRef = useRef(timeElapsed);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnims = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(1))
  ).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // keep refs in sync with state
  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    selectedAnswerRef.current = selectedAnswer;
  }, [selectedAnswer]);

  useEffect(() => {
    correctAnswersRef.current = correctAnswers;
  }, [correctAnswers]);

  useEffect(() => {
    timeElapsedRef.current = timeElapsed;
  }, [timeElapsed]);

  // restore any in-progress quiz state when opening this screen
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!quiz || !loadInProgress || !progress) return;

      try {
        // First check if we already have a completed result for this quiz
        const existingResult = progress.quizResults[quiz.id];
        if (existingResult) {
          // Quiz was already completed - start fresh
          if (mounted) {
            setCurrentQuestionIndex(0);
            setTimeElapsed(0);
            setCorrectAnswers(0);
            setSelectedAnswer(null);
            setShowResult(false);
          }
          return;
        }

        // No completed result yet - try to restore in-progress state
        const ip = await loadInProgress(quiz.id);
        if (mounted && ip) {
          setCurrentQuestionIndex(ip.currentQuestionIndex ?? 0);
          setTimeElapsed(ip.timeElapsed ?? 0);
          setCorrectAnswers(ip.correctAnswers ?? 0);
          setSelectedAnswer(ip.selectedAnswer ?? null);
        } else if (mounted && isFocused) {
          // No in-progress snapshot: ensure local state is reset when focused
          setCurrentQuestionIndex(0);
          setTimeElapsed(0);
          setCorrectAnswers(0);
          setSelectedAnswer(null);
          setShowResult(false);
        }
      } catch (err) {
        // ignore - already logged in context
      }
    })();

    return () => {
      mounted = false;
    };
  }, [quiz?.id, loadInProgress, isFocused, progress]);

  // persist an in-progress snapshot whenever key pieces change
  useEffect(() => {
    if (!quiz || !saveInProgress) return;
    // use timeElapsedRef to avoid writing every second
    saveInProgress(quiz.id, {
      currentQuestionIndex,
      timeElapsed: timeElapsedRef.current,
      correctAnswers,
      selectedAnswer,
    });
  }, [quiz?.id, currentQuestionIndex, selectedAnswer, correctAnswers, saveInProgress]);

  // save on unmount as a last-resort snapshot
  useEffect(() => {
    return () => {
      try {
        if (!quiz || !saveInProgress) return;
        saveInProgress(quiz.id, {
          currentQuestionIndex: currentQuestionIndexRef.current,
          timeElapsed: timeElapsedRef.current,
          correctAnswers: correctAnswersRef.current,
          selectedAnswer: selectedAnswerRef.current,
        });
      } catch (err) {
        // noop
      }
    };
  }, [quiz?.id, saveInProgress]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex, fadeAnim]);

  // Generate styles from theme
  const styles = React.useMemo(() => createQuizStyles(theme, categoryColor), [theme, categoryColor]);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Quiz non trouvé</Text>
      </View>
    );
  }

  const currentQuestion: Question = shuffledQuestions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  const handleAnswerPress = (answerIndex: number) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answerIndex);

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    Animated.sequence([
      Animated.timing(scaleAnims[answerIndex], {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[answerIndex], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } else {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        });
      } else {
        const badge = getBadge(correctAnswers + (answerIndex === currentQuestion.correctAnswer ? 1 : 0), shuffledQuestions.length);
        const quizResult = {
          quizId: quiz.id,
          score: correctAnswers + (answerIndex === currentQuestion.correctAnswer ? 1 : 0),
          totalQuestions: shuffledQuestions.length,
          timeSpent: timeElapsed,
          badge,
          date: new Date().toISOString(),
        };
        try {
          // First save the quiz result
          saveQuizResult(quizResult);
          // Then clear in-progress state since this quiz is completed
          clearInProgress?.(quiz.id);
        } catch (err) {
          console.error('Error saving quiz result:', err);
        }
        // Navigate to results screen
        router.replace(`/results?quizId=${quiz.id}` as never);
      }
    }, 1500);

    setShowResult(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            router.back();
          }}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerContent}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1}/{shuffledQuestions.length}
            </Text>
          </View>

          <View style={styles.timerContainer}>
            <Clock size={16} color="#FFFFFF" />
            <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable content */}
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Question Card */}
          <View style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Sparkles size={20} color={categoryColor} />
              <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {currentQuestion.image && (
              <Image
                source={
                  typeof currentQuestion.image === "string"
                    ? { uri: currentQuestion.image }
                    : currentQuestion.image
                }
                style={styles.questionImage}
                contentFit="contain"
              />
            )}
          </View>

          {/* Answers */}
          <View style={styles.answersContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect && isSelected;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <Animated.View key={index} style={{ transform: [{ scale: scaleAnims[index] }] }}>
                  <Pressable
                    style={[
                      styles.answerButton,
                      isSelected && styles.answerButtonSelected,
                      showCorrect && styles.answerButtonCorrect,
                      showIncorrect && styles.answerButtonIncorrect,
                    ]}
                    onPress={() => handleAnswerPress(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <View style={styles.answerContent}>
                      <View style={[
                        styles.answerIndex,
                        isSelected && styles.answerIndexSelected,
                        showCorrect && styles.answerIndexCorrect,
                        showIncorrect && styles.answerIndexIncorrect,
                      ]}>
                        <Text style={[
                          styles.answerIndexText,
                          (isSelected || showCorrect || showIncorrect) && styles.answerIndexTextSelected,
                        ]}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.answerText,
                          (isSelected || showCorrect || showIncorrect) && styles.answerTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </View>

                    {showCorrect && (
                      <View style={styles.resultIcon}>
                        <CheckCircle2 size={24} color="#FFFFFF" fill="#FFFFFF" />
                      </View>
                    )}
                    {showIncorrect && (
                      <View style={styles.resultIcon}>
                        <XCircle size={24} color="#FFFFFF" fill="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                </Animated.View>
              );
            })}
          </View>

        </ScrollView>
      </Animated.View>

    </View>
  );

}

const createQuizStyles = (theme: any, categoryColor: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Header
  header: {
    backgroundColor: categoryColor,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },

  headerContent: {
    gap: 12,
  },

  progressContainer: {
    gap: 8,
  },

  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    overflow: 'hidden' as const,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700' as const,
    fontFamily: "Inter_900Black",
  },

  timerContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start' as const,
  },

  timerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700' as const,
    fontFamily: "Inter_900Black",
  },

  // Content
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },

  // Question Card
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },

  questionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },

  questionNumber: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '700' as const,
  },

  questionText: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800' as const,
    lineHeight: 32,
    fontFamily: "Inter_900Black",
  },

  questionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    marginTop: 8,
  },

  // Answers
  answersContainer: {
    gap: 12,
  },

  answerButton: {
    backgroundColor: theme.colors.surface,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  answerButtonSelected: {
    backgroundColor: theme.colors.primaryLight,
    borderColor: theme.colors.primary,
  },

  answerButtonCorrect: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },

  answerButtonIncorrect: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },

  answerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    flex: 1,
  },

  answerIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },

  answerIndexSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  answerIndexCorrect: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  answerIndexIncorrect: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  answerIndexText: {
    fontSize: 14,
    fontWeight: '800' as const,
    color: theme.colors.text,
  },

  answerIndexTextSelected: {
    color: '#FFFFFF',
  },

  answerText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
    flex: 1,
  },

  answerTextSelected: {
    color: '#FFFFFF',
  },

  resultIcon: {
    marginLeft: 8,
  },

  errorText: {
    color: theme.colors.text,
    fontSize: 18,
    textAlign: 'center' as const,
    padding: 20,
  },
});
