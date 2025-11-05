import { Quiz } from '@/types/quiz';
import { armyQuiz } from './categories/army';
import { cultureQuiz } from './categories/culture';
import { historyQuiz } from './categories/history';
import { nonGradesQuiz } from './categories/none_grade';
import { scienceQuiz } from './categories/science';
import { sportsQuiz } from './categories/sports';

export const quizzes: Quiz[] = [
  nonGradesQuiz,
  armyQuiz,
  scienceQuiz,
  historyQuiz,
  sportsQuiz,
  cultureQuiz,
  
];

export const getBadge = (score: number, totalQuestions: number): 'bronze' | 'silver' | 'gold' | 'platinum' => {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage === 100) {
    return 'platinum' as const;
  }
  if (percentage >= 80) {
    return 'gold' as const;
  }
  if (percentage >= 60) {
    return 'silver' as const;
  }
  return 'bronze' as const;
};

export const getBadgeColor = (badge: 'bronze' | 'silver' | 'gold' | 'platinum'): string => {
  const colors: Record<'bronze' | 'silver' | 'gold' | 'platinum', string> = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  };
  return colors[badge];
};

export const getBadgeEmoji = (badge: 'bronze' | 'silver' | 'gold' | 'platinum'): string => {
  const emojis: Record<'bronze' | 'silver' | 'gold' | 'platinum', string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
  };
  return emojis[badge];
};