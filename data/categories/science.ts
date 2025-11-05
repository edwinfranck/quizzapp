import { Quiz } from '@/types/quiz';

export const scienceQuiz: Quiz = {
  id: 'science',
  title: 'Sciences',
  icon: '🔬',
  color: '#8B5CF6',
  requiredPoints: 30,
  questions: [
    {
      id: 'sci1',
      question: 'Quelle est la formule chimique de l\'eau ?',
      options: ['H2O', 'CO2', 'O2', 'H2O2'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'sci2',
      question: 'Quelle planète est surnommée la planète rouge ?',
      options: ['Vénus', 'Jupiter', 'Mars', 'Saturne'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'sci3',
      question: 'Combien d\'os y a-t-il dans le corps humain adulte ?',
      options: ['186', '206', '226', '246'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'sci4',
      question: 'Quelle est la vitesse de la lumière ?',
      options: ['300 000 km/s', '150 000 km/s', '450 000 km/s', '600 000 km/s'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'sci5',
      question: 'Qui a développé la théorie de la relativité ?',
      options: ['Newton', 'Einstein', 'Galilée', 'Hawking'],
      correctAnswer: 1,
      points: 10,
    },
  ],
};