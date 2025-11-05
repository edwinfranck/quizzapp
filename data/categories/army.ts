import { Quiz } from '@/types/quiz';

export const armyQuiz: Quiz = {
  id: 'army',
  title: 'Armée de Terre',
  icon: '🌍',
  color: '#3B82F6',
  requiredPoints: 0,
  questions: [
    {
      id: 'arm1',
      question: 'Quel monument est représenté sur cette image ?',
      image: require('@/assets/images/icon.png'),
      options: ['Big Ben', 'Tour Eiffel', 'Colisée', 'Statue de la Liberté'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'arm2',
      question: 'Quel animal typique d\'Australie est sur cette image ?',
      image: 'https://images.unsplash.com/photo-1566026807805-0c8fd676f685?w=800',
      options: ['Koala', 'Kangourou', 'Wombat', 'Émeu'],
      correctAnswer: 0,
      points: 10,
    },
    {
      id: 'arm3',
      question: 'Combien de continents y a-t-il sur Terre ?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
      points: 10,
    },
    {
      id: 'arm4',
      question: 'Quel pays a la plus grande population au monde ?',
      options: ['Inde', 'Chine', 'États-Unis', 'Indonésie'],
      correctAnswer: 1,
      points: 10,
    },
    {
      id: 'arm5',
      question: 'Quelle est la plus longue rivière du monde ?',
      options: ['Nil', 'Amazone', 'Yangtsé', 'Mississippi'],
      correctAnswer: 0,
      points: 10,
    },
  ],
};