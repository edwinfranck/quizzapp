export type Question = {
  id: string;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  points: number;
};

export type Quiz = {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: Question[];
  requiredPoints: number;
};

export type Badge = 'bronze' | 'silver' | 'gold' | 'platinum';

export type QuizResult = {
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  badge: Badge;
  date: string;
};

export type UserProgress = {
  totalPoints: number;
  quizResults: Record<string, QuizResult>;
};
