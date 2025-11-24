import { Category } from '@/types/quiz';

export const sousOfficiersSubalternesQuiz: Category = {
    id: 'sous-officiers-subalternes',
    title: 'Sous-officiers subalternes',
    icon: '🎖️',
    color: '#8f6a57ff',
    requiredPoints: 0,
    quizzes: [
        {
            id: 'sous-officiers-subalternes-1',
            title: 'Sergent',
            questions: [
                // -----------------------------------------------------
                // 1 - SERGENT
                // -----------------------------------------------------
                {
                    id: 'so1',
                    question: "Cet insigne correspond à quel grade ?",
                    image: require('@/assets/grades/ArmeTerre/Sergent-Maréchal des logis.png'),
                    options: ['Caporal-major', 'Sergent', 'Sergent-chef', 'Sergent-major'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'so2',
                    question: "Le grade Sergent appartient à quel corps ?",
                    options: ['Militaires du rang', 'Sous-officiers subalternes', 'Officiers', 'Officiers généraux'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so3',
                    question: "Quel est l'équivalent du Sergent dans la Marine ?",
                    options: ['Second maître', 'Quartier-maître', 'Maître', 'Aspirant'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'so4',
                    question: "Quelle est l'abréviation du grade Sergent ?",
                    options: ['SRG', 'SRT', 'SGT', 'SGR'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'so5',
                    question: "Cet insigne appartient à quelle armée ?",
                    image: require('@/assets/grades/Marine/Maître.png'),
                    options: ['Terre', 'Air', 'Marine', 'Police'],
                    correctAnswer: 2,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-2',
            title: 'Sergent Chef',
            questions: [
                // -----------------------------------------------------
                // 2 - SERGENT-CHEF
                // -----------------------------------------------------
                {
                    id: 'so6',
                    question: "Cet insigne correspond à quel grade ?",
                    image: require('@/assets/grades/ArmeTerre/Sergent-chef-Maréchal des logis-chef.png'),
                    options: ['Sergent', 'Sergent-chef', 'Sergent-major', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so7',
                    question: "Quel grade vient juste après Sergent ?",
                    options: ['Sergent-major', 'Caporal-chef', 'Sergent-chef', 'Adjudant'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'so8',
                    question: "Quel est l'équivalent du Sergent-chef dans la Marine ?",
                    options: ['Second maître', 'Maître', 'Maître principal', 'Capitaine de corvette'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so9',
                    question: "Quelle est l'abréviation du Sergent-chef ?",
                    options: ['SGC', 'SCF', 'SCH', 'SGF'],
                    correctAnswer: 2,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-3',
            title: 'Sergent Major',
            questions: [
                // -----------------------------------------------------
                // 3 - SERGENT-MAJOR
                // -----------------------------------------------------
                {
                    id: 'so10',
                    question: "Cet insigne correspond à quel grade ?",
                    image: require('@/assets/grades/ArmeTerre/Sergent major.png'),
                    options: ['Sergent', 'Sergent-major', 'Sergent-chef', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so11',
                    question: "Quel est le grade supérieur au Sergent-chef ?",
                    options: ['Adjudant', 'Second maître', 'Colonel', 'Sergent-major'],
                    correctAnswer: 3,
                    points: 10,
                },
                {
                    id: 'so12',
                    question: "Quel est l'équivalent du Sergent-major dans la Marine ?",
                    options: ['Second maître', 'Maître', 'Il garde le même nom', 'Lieutenant de vaisseau'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'so13',
                    question: "Quelle est l'abréviation du Sergent-major ?",
                    options: ['SGM', 'SMG', 'SGR', 'SGP'],
                    correctAnswer: 0,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-4',
            title: 'Insignes sous-officiers subalternes',
            questions: [
                // -----------------------------------------------------
                // 4 - RECONNAISSANCE D'INSIGNES (IMAGES)
                // -----------------------------------------------------
                {
                    id: 'so14',
                    question: "À quel grade appartient cet insigne ?",
                    image: require('@/assets/grades/ArmeTerre/Sergent-Maréchal des logis.png'),
                    options: ['Sergent', 'Sergent-chef', 'Sergent-major', 'Caporal chef'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'so15',
                    question: "À quel grade correspond cet insigne dans l'Armée de l'Air ?",
                    image: require('@/assets/grades/ArmeAair/Sergent-che.png'),
                    options: ['Sergent', 'Sergent-chef', 'Maître', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so16',
                    question: "Cet insigne correspond à quel corps ?",
                    image: require('@/assets/grades/ArmeTerre/Sergent major.png'),
                    options: ['Militaires du rang', 'Sous-officiers subalternes', 'Officiers', 'Marine Nationale'],
                    correctAnswer: 1,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-5',
            title: 'Ordre hiérarchique',
            questions: [
                // -----------------------------------------------------
                // 5 - ORDRE HIÉRARCHIQUE
                // -----------------------------------------------------
                {
                    id: 'so17',
                    question: "Classe ces grades du plus bas au plus élevé :",
                    options: [
                        'Sergent → Sergent-chef → Sergent-major',
                        'Sergent-major → Sergent → Sergent-chef',
                        'Sergent-chef → Sergent-major → Sergent',
                    ],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'so18',
                    question: "Quel est le grade le plus élevé parmi les sous-officiers subalternes ?",
                    options: ['Sergent', 'Sergent-major', 'Sergent-chef', 'Caporal-major'],
                    correctAnswer: 1,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-6',
            title: 'Questions transversales',
            questions: [
                // -----------------------------------------------------
                // 6 - QUESTIONS TRANSVERSALES
                // -----------------------------------------------------
                {
                    id: 'so19',
                    question: "Le Sergent appartient à quel grand corps ?",
                    options: ['Militaires du rang', 'Sous-officiers', 'Officiers', 'Marins'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so20',
                    question: "Quel est l'équivalent du Sergent-chef dans l'Armée de l'Air ?",
                    options: ['Sergent-chef', 'Maître', 'Second maître', 'Adjudant'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'so21',
                    question: "Quel grade est juste supérieur au Sergent ?",
                    options: ['Sergent-chef', 'Sergent-major', 'Adjudant', 'Maître'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'so22',
                    question: "Quel grade vient juste avant le Sergent-major ?",
                    options: ['Sergent', 'Sergent-chef', 'Caporal', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                },
            ]
        },

        {
            id: 'sous-officiers-subalternes-7',
            title: 'Reconnaissance image sous-officiers subalternes',
            questions: [
                // -----------------------------------------------------
                // 7 - RECONNAISSANCE IMAGE MARINE
                // -----------------------------------------------------
                {
                    id: 'so23',
                    question: "À quel grade correspond cet insigne ?",
                    //image: require('@/assets/grades/Marine/Maitre.png'),
                    options: ['Second maître', 'Maître', 'Maître principal', 'Sergent-major'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so24',
                    question: "Cet insigne équivaut à quel grade dans l'Armée de Terre ?",
                    //image: require('@/assets/grades/Marine/SecondMaitre.png'),
                    options: ['Caporal', 'Sergent', 'Sergent-chef', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'so25',
                    question: "Quel est l'équivalent du Maître dans l'Armée de Terre ?",
                    options: ['Caporal-major', 'Sergent-chef', 'Sergent-major', 'Adjudant'],
                    correctAnswer: 1,
                    points: 10,
                }
            ]
        },
    ]

};
