import { useProgress } from '@/contexts/ProgressContext';
import { getBadge, quizzes } from '@/data/quizzes';
import { Question } from '@/types/quiz';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle2, Clock, XCircle } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/quiz.styles';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { saveQuizResult, progress } = useProgress();

  // in-progress helpers (save/restore partial quiz state)
  const { saveInProgress, loadInProgress, clearInProgress } = useProgress();

  const isFocused = useIsFocused();

  const quiz = quizzes.find((q) => q.id === id);
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

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Quiz non trouvé</Text>
      </View>
    );
  }

  const currentQuestion: Question = quiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

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
      if (currentQuestionIndex < quiz.questions.length - 1) {
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
        const badge = getBadge(correctAnswers + (answerIndex === currentQuestion.correctAnswer ? 1 : 0), quiz.questions.length);
        const quizResult = {
          quizId: quiz.id,
          score: correctAnswers + (answerIndex === currentQuestion.correctAnswer ? 1 : 0),
          totalQuestions: quiz.questions.length,
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
  <View style={[styles.container, { backgroundColor: quiz.color, paddingTop: insets.top }]}>
    
    {/* Header (non scrollable) */}
    <View style={styles.header}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{quiz.questions.length}
        </Text>
      </View>

      <View style={styles.timerContainer}>
        <Clock size={18} color="#FFFFFF" />
        <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
      </View>
    </View>

    {/* Scrollable content */}
    <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
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

        <View style={styles.answersContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            // Only reveal the correct answer when the user actually selected it.
            // This prevents showing the correct option when the user answered
            // incorrectly and will retry later.
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
                  <Text
                    style={[
                      styles.answerText,
                      (isSelected || showCorrect) && styles.answerTextSelected,
                    ]}
                  >
                    {option}
                  </Text>

                  {showCorrect && <CheckCircle2 size={24} color="#FFFFFF" />}
                  {showIncorrect && <XCircle size={24} color="#FFFFFF" />}
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
