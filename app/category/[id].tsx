import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Lock, Trophy, Star, Play, Sparkles, Zap, ArrowLeft } from 'lucide-react-native';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CategoryScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const { progress, isQuizUnlocked } = useProgress();

    const category = categories.find((c) => c.id === id);
    const styles = React.useMemo(() => createCategoryStyles(theme), [theme]);

    if (!category) {
        return (
            <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FFF', fontSize: 18 }}>Catégorie introuvable</Text>
                <Pressable onPress={() => router.back()} style={{ marginTop: 20, padding: 10, backgroundColor: '#FFF', borderRadius: 8 }}>
                    <Text>Retour</Text>
                </Pressable>
            </View>
        );
    }

    const handlePress = (quizId: string) => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        router.push(`/quiz/${quizId}`);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>

            {/* HEADER */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.colors.textInverse} />
                </Pressable>
                <Text style={styles.headerTitle}>{category.title}</Text>
                {/* Spacer for alignment */}
                <View style={{ width: 24 }} />
            </View>

            {/* LIST */}
            <ScrollView contentContainerStyle={styles.listContainer}>
                <View style={styles.list}>
                    {category.quizzes.map((quiz) => {
                        // Logic for unlocking quizzes within a category could be added here.
                        // For now, we assume if the category is unlocked, its quizzes are accessible,
                        // or we can implement per-quiz locking if needed.
                        // The original logic had locking based on total points for the "quiz" (now category).

                        // Let's assume all quizzes in an unlocked category are unlocked for now, 
                        // or we can check if the category itself is unlocked.
                        const categoryUnlocked = isQuizUnlocked(category.requiredPoints);

                        // If we want to track progress per quiz, we need to update how progress is stored.
                        // The current progress context uses quizId. Since we have unique quiz IDs, it should still work.
                        const result = progress.quizResults[quiz.id];

                        return (
                            <Pressable
                                key={quiz.id}
                                onPress={() => handlePress(quiz.id)}
                                disabled={!categoryUnlocked}
                                style={({ pressed }) => [
                                    styles.card,
                                    { backgroundColor: 'rgba(255,255,255,0.1)' }, // Slightly lighter background for items
                                    !categoryUnlocked && styles.cardLocked,
                                    pressed && categoryUnlocked && styles.cardPressed,
                                ]}
                            >
                                <View style={styles.cardContent}>
                                    <View>
                                        <Text style={styles.quizTitle}>{quiz.title}</Text>
                                        <Text style={styles.quizSubText}>{quiz.questions.length} questions</Text>
                                    </View>

                                    {categoryUnlocked ? (
                                        result ? (
                                            <View style={styles.badgeContainer}>
                                                {result.badge === 'platinum' && <Sparkles size={20} color="#FFF" />}
                                                {result.badge === 'gold' && <Trophy size={20} color="#FFF" />}
                                                {result.badge === 'silver' && <Star size={20} color="#FFF" />}
                                                {result.badge === 'bronze' && <Zap size={20} color="#FFF" fill="#FFF" />}
                                                <Text style={styles.scoreText}>{result.score}/{result.totalQuestions}</Text>
                                            </View>
                                        ) : (
                                            <Play size={24} color="#FFF" />
                                        )
                                    ) : (
                                        <Lock size={24} color="#FFF" />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}


const createCategoryStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        paddingHorizontal: 22,
        paddingVertical: 20,
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        backgroundColor: theme.colors.primary,
    },

    backButton: {
        padding: 4,
    },

    headerTitle: {
        fontSize: 22,
        color: theme.colors.textInverse,
        fontFamily: 'Inter_900Black',
        flex: 1,
        textAlign: 'center' as const,
    },

    listContainer: {
        padding: 16,
    },

    list: {
        gap: 12,
    },

    card: {
        borderRadius: 16,
        padding: 16,
        minHeight: 80,
        justifyContent: 'center' as const,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    cardLocked: {
        opacity: 0.5,
    },

    cardPressed: {
        opacity: 0.8,
    },

    cardContent: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
    },

    quizTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: theme.colors.text,
    },

    quizSubText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },

    badgeContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: 8,
    },

    scoreText: {
        color: theme.colors.text,
        fontWeight: '600' as const,
    }
});
