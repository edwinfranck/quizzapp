import { Quiz } from '@/types/quiz';

export const cultureQuiz: Quiz = {
  id: 'culture',
  title: 'Culture Pop',
  icon: '🎬',
  color: '#F59E0B',
  requiredPoints: 120,
  questions: [
    {
      id: 'cult1',
      question: 'Qui a peint la Joconde ?',
      options: ['Picasso', 'Van Gogh', 'Léonard de Vinci', 'Michel-Ange'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'cult2',
      question: 'Quel est le film le plus rentable de tous les temps ?',
      options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'cult3',
      question: 'Qui a écrit "Les Misérables" ?',
      options: ['Émile Zola', 'Victor Hugo', 'Molière', 'Voltaire'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'cult4',
      question: 'Quel groupe a chanté "Bohemian Rhapsody" ?',
      options: ['The Beatles', 'Queen', 'Led Zeppelin', 'Pink Floyd'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'cult5',
      question: 'Quel est le prénom de Picasso ?',
      options: ['Pablo', 'Diego', 'Salvador', 'Francisco'],
      correctAnswer: 0,
      points: 10,
    },
  ],
};