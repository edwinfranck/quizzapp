import { QuizResult, UserProgress } from '@/types/quiz';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@quiz_progress';
const INPROGRESS_KEY = '@quiz_inprogress';

const defaultProgress: UserProgress = {
  totalPoints: 0,
  quizResults: {},
};

export const [ProgressProvider, useProgress] = createContextHook(() => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  type InProgressState = {
    currentQuestionIndex: number;
    timeElapsed: number;
    correctAnswers: number;
    selectedAnswer: number | null;
  };

  const saveInProgress = useCallback(async (quizId: string, state: InProgressState) => {
    try {
      const stored = await AsyncStorage.getItem(INPROGRESS_KEY);
      const map = stored ? JSON.parse(stored) : {};
      map[quizId] = state;
      await AsyncStorage.setItem(INPROGRESS_KEY, JSON.stringify(map));
    } catch (error) {
      console.error('Error saving in-progress quiz state:', error);
    }
  }, []);

  const loadInProgress = useCallback(async (quizId: string): Promise<InProgressState | undefined> => {
    try {
      const stored = await AsyncStorage.getItem(INPROGRESS_KEY);
      if (!stored) return undefined;
      const map = JSON.parse(stored);
      return map[quizId];
    } catch (error) {
      console.error('Error loading in-progress quiz state:', error);
      return undefined;
    }
  }, []);

  const clearInProgress = useCallback(async (quizId: string) => {
    try {
      const stored = await AsyncStorage.getItem(INPROGRESS_KEY);
      if (!stored) return;
      const map = JSON.parse(stored);
      delete map[quizId];
      await AsyncStorage.setItem(INPROGRESS_KEY, JSON.stringify(map));
    } catch (error) {
      console.error('Error clearing in-progress quiz state:', error);
    }
  }, []);

  const saveQuizResult = useCallback(
    (result: QuizResult) => {
      const existingResult = progress.quizResults[result.quizId];

      // Assume 10 points per question by default. If you later want variable
      // points per question, pass pointsEarned in the QuizResult or compute it
      // here with access to the quiz data.
      const POINTS_PER_QUESTION = 10;

      const newPoints = result.score * POINTS_PER_QUESTION;
      const prevPoints = existingResult ? existingResult.score * POINTS_PER_QUESTION : 0;
      const delta = newPoints - prevPoints;

      const newTotal = Math.max(0, progress.totalPoints + delta);

      const newProgress: UserProgress = {
        totalPoints: newTotal,
        quizResults: {
          ...progress.quizResults,
          [result.quizId]: result,
        },
      };

      saveProgress(newProgress);
    },
    [progress]
  );

  const resetProgress = useCallback(async () => {
    try {
      await saveProgress(defaultProgress);
      // clear any in-progress quiz snapshots so quizzes restart fresh
      await AsyncStorage.removeItem(INPROGRESS_KEY);
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }, []);

  const getQuizResult = useCallback(
    (quizId: string): QuizResult | undefined => {
      return progress.quizResults[quizId];
    },
    [progress]
  );

  const isQuizUnlocked = useCallback(
    (requiredPoints: number): boolean => {
      return progress.totalPoints >= requiredPoints;
    },
    [progress]
  );

  return useMemo(
    () => ({
      progress,
      isLoading,
      saveQuizResult,
      resetProgress,
      getQuizResult,
      isQuizUnlocked,
      // in-progress helpers
      saveInProgress,
      loadInProgress,
      clearInProgress,
    }),
    [progress, isLoading, saveQuizResult, resetProgress, getQuizResult, isQuizUnlocked, saveInProgress, loadInProgress, clearInProgress]
  );
});
