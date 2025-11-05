import { Quiz } from '@/types/quiz';

export const historyQuiz: Quiz = {
  id: 'history',
  title: 'Histoire',
  icon: '📜',
  color: '#EF4444',
  requiredPoints: 60,
  questions: [
    {
      id: 'hist1',
      question: 'En quelle année a eu lieu la Révolution française ?',
      options: ['1789', '1799', '1804', '1815'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'hist2',
      question: 'Qui a découvert l\'Amérique ?',
      options: ['Magellan', 'Vasco de Gama', 'Christophe Colomb', 'Marco Polo'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'hist3',
      question: 'Quelle guerre a duré de 1939 à 1945 ?',
      options: ['Première Guerre mondiale', 'Guerre de Corée', 'Seconde Guerre mondiale', 'Guerre du Vietnam'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'hist4',
      question: 'Qui était le premier président des États-Unis ?',
      options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'hist5',
      question: 'En quelle année l\'homme a-t-il marché sur la Lune ?',
      options: ['1965', '1967', '1969', '1971'],
      correctAnswer: 2,
      points: 10,
    },
  ],
};