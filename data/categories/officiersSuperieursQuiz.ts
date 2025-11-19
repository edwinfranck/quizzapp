import { Category } from '@/types/quiz';

export const officiersSuperieursQuiz: Category = {
    id: 'officiers-superieurs',
    title: 'Officiers supérieurs',
    icon: '🎖️',
    color: '#7c4c4cff',
    requiredPoints: 350,
    quizzes: [
        {
            id: 'officiers-superieurs-1',
            title: 'Niveau 1',
            questions: [
                // -----------------------------------------------------
                // 1 - COMMANDANT
                // -----------------------------------------------------
                {
                    id: 'osup1',
                    question: "Cet insigne correspond à quel grade ?",
                    //image: require('@/assets/grades/Armee/Commandant.png'),
                    options: ['Capitaine', 'Commandant', 'Lieutenant-colonel', 'Colonel'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup2',
                    question: "Quel est le premier grade des officiers supérieurs ?",
                    options: ['Commandant', 'Lieutenant-colonel', 'Colonel', 'Capitaine-major'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'osup3',
                    question: "Quel est l’équivalent du Commandant dans la Marine ?",
                    options: [
                        'Capitaine de frégate',
                        'Capitaine de corvette',
                        'Capitaine de vaisseau',
                        'Lieutenant de vaisseau'
                    ],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup4',
                    question: "Quelle est l’abréviation du Commandant ?",
                    options: ['CMD', 'CMT', 'CDT', 'CMG'],
                    correctAnswer: 2,
                    points: 10,
                },

                // -----------------------------------------------------
                // 2 - LIEUTENANT-COLONEL
                // -----------------------------------------------------
                {
                    id: 'osup5',
                    question: "Cet insigne correspond à quel grade ?",
                    //image: require('@/assets/grades/Armee/LieutenantColonel.png'),
                    options: ['Lieutenant', 'Capitaine', 'Lieutenant-colonel', 'Colonel'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup6',
                    question: "Quel grade vient juste après Commandant ?",
                    options: ['Colonel', 'Lieutenant-colonel', 'Colonel-major', 'Capitaine-major'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup7',
                    question: "Quel est l’équivalent du Lieutenant-colonel dans la Marine ?",
                    options: [
                        'Capitaine de vaisseau',
                        'Capitaine de frégate',
                        'Capitaine de corvette',
                        'Capitaine-major'
                    ],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup8',
                    question: "Quelle est l’abréviation du Lieutenant-colonel ?",
                    options: ['LCN', 'LCL', 'LTC', 'LCO'],
                    correctAnswer: 1,
                    points: 10,
                },

                // -----------------------------------------------------
                // 3 - COLONEL
                // -----------------------------------------------------
                {
                    id: 'osup9',
                    question: "Cet insigne correspond à quel grade ?",
                    //image: require('@/assets/grades/Armee/Colonel.png'),
                    options: ['Colonel', 'Colonel-major', 'Lieutenant-colonel', 'Capitaine'],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'osup10',
                    question: "Quel est l’équivalent du Colonel dans la Marine ?",
                    options: [
                        'Capitaine de corvette',
                        'Capitaine de frégate',
                        'Capitaine de vaisseau',
                        'Contre-amiral'
                    ],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup11',
                    question: "Quelle est l’abréviation du grade Colonel ?",
                    options: ['COL', 'CNL', 'COLN', 'CLN'],
                    correctAnswer: 0,
                    points: 10,
                },

                // -----------------------------------------------------
                // 4 - COLONEL-MAJOR
                // -----------------------------------------------------
                {
                    id: 'osup12',
                    question: "Cet insigne correspond à quel grade ?",
                    //image: require('@/assets/grades/Armee/ColonelMajor.png'),
                    options: ['Colonel', 'Colonel-major', 'Lieutenant-colonel', 'Commandant'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup13',
                    question: "Quel est le grade le plus élevé des officiers supérieurs ?",
                    options: ['Colonel', 'Commandant', 'Colonel-major', 'Lieutenant-colonel'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup14',
                    question: "Quel est l’équivalent du Colonel-major dans la Marine ?",
                    options: [
                        'Capitaine de vaisseau major',
                        'Vice-amiral',
                        'Capitaine de frégate',
                        'Contre-amiral'
                    ],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'osup15',
                    question: "Abréviation correcte du grade Colonel-major ?",
                    options: ['CLM', 'CMJ', 'COLM', 'CMA'],
                    correctAnswer: 0,
                    points: 10,
                },

                // -----------------------------------------------------
                // 5 - RECONNAISSANCE D’INSIGNES MARINE + AIR
                // -----------------------------------------------------
                {
                    id: 'osup16',
                    question: "Ce grade appartient à quelle armée ?",
                    //image: require('@/assets/grades/Marine/Drapeau-Corvette.png'),
                    options: ['Terre', 'Air', 'Marine', 'Police'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup17',
                    question: "Cet insigne correspond à quel grade dans la Marine ?",
                    //image: require('@/assets/grades/Marine/CapitaineCorvette.png'),
                    options: [
                        'Capitaine de corvette',
                        'Capitaine de frégate',
                        'Capitaine de vaisseau',
                        'Capitaine-major'
                    ],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'osup18',
                    question: "Quel est l’équivalent Terre de ce grade ?",
                    //image: require('@/assets/grades/Marine/CapitaineFregate.png'),
                    options: [
                        'Commandant',
                        'Lieutenant-colonel',
                        'Colonel',
                        'Colonel-major'
                    ],
                    correctAnswer: 1,
                    points: 10,
                },

                // -----------------------------------------------------
                // 6 - HIÉRARCHIE
                // -----------------------------------------------------
                {
                    id: 'osup19',
                    question: "Classe ces grades du plus bas au plus élevé :",
                    options: [
                        'Commandant → Lieutenant-colonel → Colonel → Colonel-major',
                        'Colonel → Commandant → Lieutenant-colonel → Colonel-major',
                        'Commandant → Colonel → Lieutenant-colonel → Colonel-major'
                    ],
                    correctAnswer: 0,
                    points: 10,
                },
                {
                    id: 'osup20',
                    question: "Quel grade vient juste après Lieutenant-colonel ?",
                    options: ['Colonel', 'Commandant', 'Colonel-major', 'Capitaine-major'],
                    correctAnswer: 0,
                    points: 10,
                },

                // -----------------------------------------------------
                // 7 - QUESTIONS TRANSVERSES
                // -----------------------------------------------------
                {
                    id: 'osup21',
                    question: "À quel corps appartiennent les officiers supérieurs ?",
                    options: [
                        'Militaires du rang',
                        'Sous-officiers',
                        'Officiers',
                        'Officiers généraux'
                    ],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup22',
                    question: "Quel grade précède immédiatement le Colonel ?",
                    options: ['Commandant', 'Lieutenant-colonel', 'Colonel-major', 'Capitaine'],
                    correctAnswer: 1,
                    points: 10,
                },
                {
                    id: 'osup23',
                    question: "Quel grade vient après Colonel-major ?",
                    options: [
                        'Commandant',
                        'Général de brigade',
                        'Colonel',
                        'Capitaine de frégate'
                    ],
                    correctAnswer: 1,
                    points: 10,
                },

                // -----------------------------------------------------
                // 8 - LOGIQUE, DIFFICILE
                // -----------------------------------------------------
                {
                    id: 'osup24',
                    question: "Quel grade a l'équivalent 'Capitaine de vaisseau' ?",
                    options: ['Commandant', 'Lieutenant-colonel', 'Colonel', 'Colonel-major'],
                    correctAnswer: 2,
                    points: 10,
                },
                {
                    id: 'osup25',
                    question: "Parmi ces grades, lequel n’est PAS un officier supérieur ?",
                    options: ['Colonel', 'Commandant', 'Capitaine-major', 'Lieutenant-colonel'],
                    correctAnswer: 2,
                    points: 10,
                }
            ]
        }
    ],
};
