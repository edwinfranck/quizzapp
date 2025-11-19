import { Quiz } from '@/types/quiz';

export const officiersGenerauxQuiz: Quiz = {
    id: 'officiers-generaux',
    title: 'Officiers généraux',
    icon: '⭐',
    color: '#a27c3fff',
    requiredPoints: 500,
    questions: [
        // -----------------------------------------------------
        // 1 - GÉNÉRAL DE BRIGADE
        // -----------------------------------------------------
        {
            id: 'og1',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/GeneralBrigade.png'),
            options: [
                'Général de brigade',
                'Général de division',
                'Général de corps d’armée',
                'Général d’armée'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og2',
            question: "Quel est le premier grade des officiers généraux ?",
            options: [
                'Général de division',
                'Général de brigade',
                'Général de corps d’armée',
                'Colonel-major'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og3',
            question: "Quel est l’équivalent du Général de brigade dans la Marine ?",
            options: [
                'Contre-amiral',
                'Vice-amiral',
                'Capitaine de vaisseau',
                'Amiral'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og4',
            question: "Quelle est l’abréviation de Général de brigade ?",
            options: ['GBR', 'GBG', 'GRB', 'GDB'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 2 - GÉNÉRAL DE DIVISION
        // -----------------------------------------------------
        {
            id: 'og5',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/GeneralDivision.png'),
            options: [
                'Général de brigade',
                'Général de division',
                'Général de corps d’armée',
                'Général d’armée'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og6',
            question: "Quel grade vient juste après Général de brigade ?",
            options: [
                'Général de corps d’armée',
                'Général de division',
                'Général d’armée',
                'Contre-amiral'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og7',
            question: "Quel est l’équivalent Marine du Général de division ?",
            options: ['Vice-amiral', 'Contre-amiral', 'Amiral', 'Lieutenant de vaisseau'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og8',
            question: "Quelle est l’abréviation du Général de division ?",
            options: ['GDD', 'GDV', 'GVD', 'GND'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 3 - GÉNÉRAL DE CORPS D’ARMÉE
        // -----------------------------------------------------
        {
            id: 'og9',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/GeneralCorpsArmee.png'),
            options: [
                'Général de brigade',
                'Général de division',
                'Général de corps d’armée',
                'Général d’armée'
            ],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'og10',
            question: "Quel grade vient après Général de division ?",
            options: [
                'Général de brigade',
                'Général de corps d’armée',
                'Général d’armée',
                'Amiral'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og11',
            question: "Quel est l'équivalent Marine du Général de corps d’armée ?",
            options: [
                'Vice-amiral d’escadre',
                'Vice-amiral',
                'Amiral',
                'Contre-amiral'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og12',
            question: "Abréviation du grade Général de corps d’armée ?",
            options: ['GCA', 'GCC', 'GCO', 'GCR'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 4 - GÉNÉRAL D’ARMÉE
        // -----------------------------------------------------
        {
            id: 'og13',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/GeneralArmee.png'),
            options: [
                'Général de brigade',
                'Général de division',
                'Général de corps d’armée',
                'Général d’armée'
            ],
            correctAnswer: 3,
            points: 10,
        },
        {
            id: 'og14',
            question: "Quel est le grade le plus élevé dans l’armée béninoise ?",
            options: [
                'Général de division',
                'Général d’armée',
                'Colonel-major',
                'Vice-amiral'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og15',
            question: "Quel est l’équivalent Marine du Général d’armée ?",
            options: [
                'Amiral',
                'Vice-amiral d’escadre',
                'Contre-amiral',
                'Capitaine de vaisseau'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og16',
            question: "Quelle est l’abréviation du Général d’armée ?",
            options: ['GAR', 'GDA', 'GAM', 'GNR'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 5 - RECONNAISSANCE D’INSIGNES (MARINE)
        // -----------------------------------------------------
        {
            id: 'og17',
            question: "À quel grade Marine correspond cet insigne ?",
            //image: require('@/assets/grades/Marine/ContreAmiral.png'),
            options: ['Contre-amiral', 'Vice-amiral', 'Amiral', 'Capitaine-major'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og18',
            question: "Ce grade correspond à quel grade dans l’Armée de Terre ?",
            //image: require('@/assets/grades/Marine/ViceAmiral.png'),
            options: [
                'Général de brigade',
                'Général de division',
                'Général de corps d’armée',
                'Général d’armée'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og19',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Marine/Amiral.png'),
            options: ['Colonel-major', 'Général d’armée', 'Vice-amiral', 'Amiral'],
            correctAnswer: 3,
            points: 10,
        },

        // -----------------------------------------------------
        // 6 - HIÉRARCHIE
        // -----------------------------------------------------
        {
            id: 'og20',
            question: "Classe du plus bas au plus élevé :",
            options: [
                'Général de brigade → Général de division → Général de corps d’armée → Général d’armée',
                'Général de division → Général de brigade → Général d’armée → Général de corps d’armée',
                'Général d’armée → Général de division → Général de brigade → Général de corps d’armée'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og21',
            question: "Quel grade vient juste avant Général d’armée ?",
            options: [
                'Général de division',
                'Général de brigade',
                'Général de corps d’armée',
                'Contre-amiral'
            ],
            correctAnswer: 2,
            points: 10,
        },

        // -----------------------------------------------------
        // 7 - QUESTIONS TRANSVERSES + DIFFICILES
        // -----------------------------------------------------
        {
            id: 'og22',
            question: "À quel grand corps appartiennent les généraux ?",
            options: ['Militaires du rang', 'Sous-officiers', 'Officiers', 'Officiers généraux'],
            correctAnswer: 3,
            points: 10,
        },
        {
            id: 'og23',
            question: "Quel grade vient immédiatement avant Général de division ?",
            options: ['Général de brigade', 'Colonel-major', 'Général de corps d’armée', 'Capitaine de frégate'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'og24',
            question: "Quel grade Marine équivaut au Général d’armée ?",
            options: ['Vice-amiral', 'Amiral', 'Capitaine de vaisseau major', 'Contre-amiral'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'og25',
            question: "Lequel de ces grades n’est pas un officier général ?",
            options: [
                'Général de division',
                'Général d’armée',
                'Général de brigade',
                'Colonel'
            ],
            correctAnswer: 3,
            points: 10,
        }
    ],
};
