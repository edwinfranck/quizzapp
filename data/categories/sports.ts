import { Quiz } from '@/types/quiz';

export const sportsQuiz: Quiz = {
  id: 'sports',
  title: 'Sports',
  icon: '⚽',
  color: '#10B981',
  requiredPoints: 90,
  questions: [
    {
      id: 'sport1',
      question: 'Combien de joueurs y a-t-il dans une équipe de football ?',
      options: ['9', '10', '11', '12'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'sport2',
      question: 'Quel pays a remporté la Coupe du Monde de football 2018 ?',
      options: ['Brésil', 'Allemagne', 'France', 'Argentine'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'sport3',
      question: 'Tous les combien d\'années ont lieu les Jeux Olympiques ?',
      options: ['2 ans', '3 ans', '4 ans', '5 ans'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'sport4',
      question: 'Quel sport pratique Roger Federer ?',
      options: ['Tennis', 'Golf', 'Basketball', 'Cricket'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'sport5',
      question: 'Combien de points vaut un panier à 3 points au basketball ?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 1,
      points: 10,
    },
  ],
};