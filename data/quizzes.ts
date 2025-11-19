import { Category } from '@/types/quiz';
import { militairesRangQuiz } from './categories/militairesRangQuiz';
import { sousOfficiersSubalternesQuiz } from './categories/sousOfficiersSubalternesQuiz';
import { sousOfficiersSuperieursQuiz } from './categories/sousOfficiersSuperieursQuiz';
import { officiersSubalternesQuiz } from './categories/officiersSubalternesQuiz';
import { officiersSuperieursQuiz } from './categories/officiersSuperieursQuiz';
import { officiersGenerauxQuiz } from './categories/officiersGenerauxQuiz';

export const categories: Category[] = [
  militairesRangQuiz,
  sousOfficiersSubalternesQuiz,
  sousOfficiersSuperieursQuiz,
  officiersSubalternesQuiz,
  officiersSuperieursQuiz,
  officiersGenerauxQuiz,
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