import { Quiz } from '@/types/quiz';

export const sousOfficiersSuperieursQuiz: Quiz = {
    id: 'sous-officiers-superieurs',
    title: 'Sous-officiers supérieurs',
    icon: '🎖️',
    color: '#75614eff',
    requiredPoints: 120,
    questions: [
        // -----------------------------------------------------
        // 1 - ADJUDANT
        // -----------------------------------------------------
        {
            id: 'ss1',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/Adjudant.png'),
            options: ['Sergent-major', 'Adjudant', 'Adjudant-chef', 'Adjudant-major'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss2',
            question: "Le grade Adjudant appartient à quel corps ?",
            options: [
                'Militaires du rang',
                'Sous-officiers subalternes',
                'Sous-officiers supérieurs',
                'Officiers'
            ],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'ss3',
            question: "Quel est l’équivalent de l’Adjudant dans la Marine nationale ?",
            options: ['1er maître', 'Maître', 'Maître principal', 'Quartier-maître'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'ss4',
            question: "Quelle est l’abréviation du grade Adjudant ?",
            options: ['ADJ', 'ADN', 'AGT', 'ADM'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 2 - ADJUDANT-CHEF
        // -----------------------------------------------------
        {
            id: 'ss5',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/AdjudantChef.png'),
            options: ['Adjudant', 'Adjudant-chef', 'Adjudant-major', 'Sergent-major'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss6',
            question: "Quel grade vient juste après Adjudant ?",
            options: ['Sergent-major', 'Adjudant-chef', 'Adjudant-major', 'Maître'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss7',
            question: "Quel est l’équivalent de l’Adjudant-chef dans la Marine ?",
            options: ['Maître', 'Maître principal', '1er maître', 'Second maître'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss8',
            question: "Quelle est l’abréviation correcte pour Adjudant-chef ?",
            options: ['ADC', 'ADCF', 'ADF', 'ACH'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 3 - ADJUDANT-MAJOR
        // -----------------------------------------------------
        {
            id: 'ss9',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/AdjudantMajor.png'),
            options: ['Adjudant', 'Adjudant-chef', 'Adjudant-major', 'Capitaine'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'ss10',
            question: "Lequel de ces grades est le plus élevé ?",
            options: ['Adjudant', 'Adjudant-major', 'Adjudant-chef'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss11',
            question: "Quel est l’équivalent de l’Adjudant-major dans la Marine ?",
            options: ['1er maître', 'Maître principal', 'Maître major', 'Second maître'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'ss12',
            question: "Quelle est l’abréviation du grade Adjudant-major ?",
            options: ['ADM', 'ADJ-M', 'AMD', 'ADGM'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 4 - RECONNAISSANCE D’INSIGNES (MARINE + AIR)
        // -----------------------------------------------------
        {
            id: 'ss13',
            question: "Cet insigne correspond à quel grade dans la Marine ?",
            //image: require('@/assets/grades/Marine/1erMaitre.png'),
            options: ['Second maître', '1er maître', 'Maître principal', 'Maître major'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss14',
            question: "À quel grade de l’armée de Terre correspond cet insigne ?",
            //image: require('@/assets/grades/Marine/MaitrePrincipal.png'),
            options: ['Adjudant-chef', 'Adjudant-major', 'Adjudant', 'Sergent-major'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss15',
            question: "Cet insigne appartient à quelle armée ?",
            //image: require('@/assets/grades/Air/Adjudant.png'),
            options: ['Terre', 'Air', 'Marine', 'Police'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 5 - HIÉRARCHIE
        // -----------------------------------------------------
        {
            id: 'ss16',
            question: "Classe ces grades du plus bas au plus élevé :",
            options: [
                'Adjudant → Adjudant-chef → Adjudant-major',
                'Adjudant-chef → Adjudant-major → Adjudant',
                'Adjudant → Adjudant-major → Adjudant-chef'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'ss17',
            question: "Quel grade est supérieur à Adjudant-chef ?",
            options: ['Adjudant', 'Adjudant-major', 'Sergent-major', 'Maître'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 6 - QUESTIONS TRANSVERSALES
        // -----------------------------------------------------
        {
            id: 'ss18',
            question: "Le grade Adjudant-chef appartient à quelle catégorie ?",
            options: [
                'Militaires du rang',
                'Sous-officiers subalternes',
                'Sous-officiers supérieurs',
                'Officiers'
            ],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'ss19',
            question: "Quel grade précède immédiatement l’Adjudant ?",
            options: ['Sergent-major', 'Sergent-chef', 'Caporal-major', 'Adjudant-chef'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'ss20',
            question: "Dans quelle armée trouve-t-on le grade 'Maître major' ?",
            options: ['Terre', 'Air', 'Marine', 'Police'],
            correctAnswer: 2,
            points: 10,
        },

        // -----------------------------------------------------
        // 7 - IMAGES DE COMPARAISON (DIFFICILE)
        // -----------------------------------------------------
        {
            id: 'ss21',
            question: "Quel est ce grade de la Marine ?",
            //image: require('@/assets/grades/Marine/MaitreMajor.png'),
            options: ['Maître principal', '1er maître', 'Maître major', 'Second maître'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'ss22',
            question: "À quel grade de la Terre correspond cet insigne ?",
            //image: require('@/assets/grades/Air/AdjudantChef.png'),
            options: ['Adjudant', 'Adjudant-chef', 'Adjudant-major', 'Capitaine'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'ss23',
            question: "Quel grade devient-on après Adjudant-major ?",
            options: ['Sergent-chef', 'Adjudant-chef', 'On passe chez les officiers (Sous-lieutenant)', 'Colonel'],
            correctAnswer: 2,
            points: 10,
        },

        // -----------------------------------------------------
        // 8 - ABRÉVIATIONS, CORRESPONDANCES, LOGIQUE
        // -----------------------------------------------------
        {
            id: 'ss24',
            question: "Laquelle de ces abréviations n’existe pas ?",
            options: ['ADJ', 'ADC', 'ADM', 'ADP'],
            correctAnswer: 3,
            points: 10,
        },
        {
            id: 'ss25',
            question: "Quel est le grade le plus élevé chez les sous-officiers supérieurs ?",
            options: ['Adjudant-chef', 'Adjudant-major', 'Adjudant', 'Maître'],
            correctAnswer: 1,
            points: 10,
        }
    ],
};
