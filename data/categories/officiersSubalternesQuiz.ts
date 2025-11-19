import { Quiz } from '@/types/quiz';

export const officiersSubalternesQuiz: Quiz = {
    id: 'officiers-subalternes',
    title: 'Officiers subalternes',
    icon: '🎖️',
    color: '#4f678cff',
    requiredPoints: 200,
    questions: [
        // -----------------------------------------------------
        // 1 - SOUS-LIEUTENANT
        // -----------------------------------------------------
        {
            id: 'os1',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/SousLieutenant.png'),
            options: ['Sergent-major', 'Sous-lieutenant', 'Lieutenant', 'Capitaine'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os2',
            question: "Quel est le premier grade d'officier dans l’Armée de Terre ?",
            options: ['Lieutenant', 'Capitaine', 'Sous-lieutenant', 'Aspirant'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'os3',
            question: "Quel est l’équivalent du Sous-lieutenant dans la Marine ?",
            options: [
                'Enseigne de vaisseau de 2e classe',
                'Maître',
                'Lieutenant de vaisseau',
                'Quartier-maître'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'os4',
            question: "Quelle est l’abréviation du Sous-lieutenant ?",
            options: ['SLT', 'SLN', 'SNL', 'SV2'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 2 - LIEUTENANT
        // -----------------------------------------------------
        {
            id: 'os5',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/Lieutenant.png'),
            options: ['Sous-lieutenant', 'Lieutenant', 'Capitaine', 'Commandant'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os6',
            question: "Quel grade vient après Sous-lieutenant ?",
            options: ['Lieutenant', 'Capitaine', 'Commandant', 'Major'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'os7',
            question: "Quel est l’équivalent du Lieutenant dans la Marine nationale ?",
            options: [
                'Enseigne de vaisseau 2e classe',
                'Lieutenant de vaisseau',
                'Capitaine de corvette',
                'Capitaine de vaisseau'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os8',
            question: "Quelle est l’abréviation du Lieutenant ?",
            options: ['LTT', 'LTN', 'LIE', 'LTG'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 3 - CAPITAINE
        // -----------------------------------------------------
        {
            id: 'os9',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/Capitaine.png'),
            options: ['Lieutenant', 'Capitaine', 'Commandant', 'Capitaine-major'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os10',
            question: "Quel grade vient après Lieutenant ?",
            options: ['Sous-lieutenant', 'Capitaine', 'Commandant', 'Colonel'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os11',
            question: "Quel est l’équivalent Marine du Capitaine ?",
            options: [
                'Lieutenant de vaisseau',
                'Enseigne de vaisseau 2e classe',
                'Capitaine de frégate',
                'Capitaine-major'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'os12',
            question: "Quelle est l’abréviation du grade Capitaine ?",
            options: ['CAP', 'CNE', 'CTE', 'CPT'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 4 - CAPITAINE-MAJOR
        // -----------------------------------------------------
        {
            id: 'os13',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Armee/CapitaineMajor.png'),
            options: ['Capitaine', 'Capitaine-major', 'Commandant', 'Lieutenant-colonel'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os14',
            question: "Quel est le plus haut grade des officiers subalternes ?",
            options: ['Lieutenant', 'Capitaine-major', 'Capitaine', 'Sous-lieutenant'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os15',
            question: "Quel est l’équivalent du Capitaine-major dans la Marine ?",
            options: [
                'Conducteur de bateau',
                'Capitaine-major (même appellation)',
                'Capitaine de corvette',
                'Lieutenant de vaisseau'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os16',
            question: "Quelle est l’abréviation du Capitaine-major ?",
            options: ['CMJ', 'CNM', 'CPM', 'CMO'],
            correctAnswer: 1,
            points: 10,
        },

        // -----------------------------------------------------
        // 5 - RECONNAISSANCE D’INSIGNES (MARINE)
        // -----------------------------------------------------
        {
            id: 'os17',
            question: "Cet insigne correspond à quel grade dans la Marine ?",
            //image: require('@/assets/grades/Marine/EV2.png'),
            options: [
                'Enseigne de vaisseau 1e classe',
                'Enseigne de vaisseau 2e classe',
                'Lieutenant de vaisseau',
                'Capitaine-major'
            ],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os18',
            question: "Ce grade équivaut à quel grade dans l’Armée de Terre ?",
            //image: require('@/assets/grades/Marine/EV1.png'),
            options: ['Capitaine', 'Lieutenant', 'Sous-lieutenant', 'Commandant'],
            correctAnswer: 1,
            points: 10,
        },
        {
            id: 'os19',
            question: "Cet insigne correspond à quel grade ?",
            //image: require('@/assets/grades/Marine/LieutenantVaisseau.png'),
            options: ['Lieutenant', 'Capitaine', 'Capitaine-major', 'Lieutenant de vaisseau'],
            correctAnswer: 3,
            points: 10,
        },

        // -----------------------------------------------------
        // 6 - HIÉRARCHIE
        // -----------------------------------------------------
        {
            id: 'os20',
            question: "Classe du plus bas au plus élevé :",
            options: [
                'Sous-lieutenant → Lieutenant → Capitaine → Capitaine-major',
                'Lieutenant → Sous-lieutenant → Capitaine → Capitaine-major',
                'Capitaine → Lieutenant → Capitaine-major → Sous-lieutenant'
            ],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'os21',
            question: "Quel grade vient juste après Capitaine ?",
            options: ['Capitaine-major', 'Lieutenant', 'Commandant', 'Colonel'],
            correctAnswer: 0,
            points: 10,
        },

        // -----------------------------------------------------
        // 7 - QUESTIONS TRANSVERSES
        // -----------------------------------------------------
        {
            id: 'os22',
            question: "Les officiers subalternes appartiennent à quel grand corps ?",
            options: ['Militaires du rang', 'Sous-officiers', 'Officiers', 'Officiers généraux'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'os23',
            question: "Quel grade précède immédiatement Lieutenant ?",
            options: ['Sous-lieutenant', 'Sergent-major', 'Capitaine', 'Capitaine-major'],
            correctAnswer: 0,
            points: 10,
        },
        {
            id: 'os24',
            question: "Quel grade équivaut à Lieutenant de vaisseau dans la Terre ?",
            options: ['Sous-lieutenant', 'Lieutenant', 'Capitaine', 'Commandant'],
            correctAnswer: 2,
            points: 10,
        },
        {
            id: 'os25',
            question: "Lequel de ces grades n'est PAS un officier subalterne ?",
            options: ['Capitaine', 'Lieutenant', 'Commandant', 'Sous-lieutenant'],
            correctAnswer: 2,
            points: 10,
        }
    ],
};
