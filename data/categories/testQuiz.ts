import { Category } from '@/types/quiz';

export const testQuiz: Category = {
    id: 'testQuiz',
    title: 'Test',
    icon: '🪖',
    color: '#55675fff',
    requiredPoints: 0,
    quizzes: [
        {
            id: 'militaires-rang-1',
            title: 'Niveau 1',
            questions: [
                {
                    id: 'mr1',
                    question: "Cet insigne correspond à quel grade ?",
                    image: require('@/assets/grades/ArmeTerre/Soldat de 2ème classe.png'),
                    options: ['SD2', 'SD1', 'Caporal', 'Caporal-chef'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'mr2',
                    question: "Quel est le grade le plus bas dans l'Armée de Terre ?",
                    options: ['SD1', 'Caporal', 'SD2', 'Caporal-Chef'],
                    correctAnswer: 2,
                    points: 10,
                },
            ]
        },

        {
            id: 'militaires-rang-2',
            title: 'Niveau 2',
            questions: [
                {
                    id: 'mr1',
                    question: "Cet insigne correspond à quel grade ?",
                    image: require('@/assets/grades/ArmeTerre/Caporal-chef.png'),
                    options: ['SD2', 'SD1', 'Caporal', 'Caporal-chef'],
                    correctAnswer: 3,
                    points: 10,
                },
                {
                    id: 'mr2',
                    question: "Quel est le grade le plus bas dans l'Armée de Terre ?",
                    options: ['SD1', 'Caporal', 'SD2', 'Caporal-Chef'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'mr3',
                    question: "Quelle est l'abréviation du Soldat de 1ère classe ?",
                    options: ['SC1', 'SD1', 'SL1', 'SP1'],
                    correctAnswer: 1,
                    points: 10,
                },

            ]
        }

    ]
};
