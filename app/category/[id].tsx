import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { categories, getBadge } from '@/data/quizzes';
import LockedChallengeModal from '@/components/LockedChallengeModal';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Lock, Trophy, Star, Play, Sparkles, Zap, ArrowLeft, CheckCircle, Award } from 'lucide-react-native';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Modal,
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

    // State for locked level modal
    const [lockedLevel, setLockedLevel] = useState<{
        levelNumber: number;
        requirement: string;
    } | null>(null);

    if (!category) {
        return (
            <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.text, fontSize: 18 }}>Catégorie introuvable</Text>
                <Pressable onPress={() => router.back()} style={{ marginTop: 20, padding: 10, backgroundColor: theme.colors.primary, borderRadius: 1 }}>
                    <Text style={{ color: theme.colors.textInverse }}>Retour</Text>
                </Pressable>
            </View>
        );
    }

    // Calculate progress - only count as completed if ALL quizzes in category are done
    const completedQuizzes = category.quizzes.filter(quiz => progress.quizResults[quiz.id]).length;
    const totalQuizzes = category.quizzes.length;
    const progressPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;
    const categoryUnlocked = isQuizUnlocked(category.requiredPoints);

    // Helper function to check if a quiz level is unlocked
    const isLevelUnlocked = (quizIndex: number): boolean => {
        // Category must be unlocked first
        if (!categoryUnlocked) return false;

        // First quiz is always unlocked
        if (quizIndex === 0) return true;

        // Check if previous quiz was completed with at least 60%
        const previousQuiz = category.quizzes[quizIndex - 1];
        const previousResult = progress.quizResults[previousQuiz.id];

        if (!previousResult) return false;

        const previousPercentage = (previousResult.score / previousResult.totalQuestions) * 100;
        return previousPercentage >= 60;
    };

    const handlePress = (quizId: string, quizIndex: number) => {
        const unlocked = isLevelUnlocked(quizIndex);

        if (!unlocked) {
            // Show locked modal with requirement
            const requirement = quizIndex === 0
                ? `${category.requiredPoints} points requis pour débloquer cette catégorie`
                : (() => {
                    const prevResult = progress.quizResults[category.quizzes[quizIndex - 1].id];
                    if (!prevResult) return `Terminer le niveau ${quizIndex}`;
                    const prevPercentage = (prevResult.score / prevResult.totalQuestions) * 100;
                    if (prevPercentage < 60) return `Obtenir 60% ou plus au niveau ${quizIndex}`;
                    return "Niveau verrouillé";
                })();

            setLockedLevel({
                levelNumber: quizIndex + 1,
                requirement: requirement
            });

            if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
            return;
        }

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
                <View style={styles.headerContent}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{category.title}</Text>
                        <Text style={styles.headerSubtitle}>{totalQuizzes} niveaux disponibles</Text>
                    </View>
                </View>
            </View>

            {/* PROGRESS BAR */}
            {categoryUnlocked && (
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Progression</Text>
                        <Text style={styles.progressText}>{completedQuizzes}/{totalQuizzes} complétés</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
                </View>
            )}

            {/* LIST */}
            <ScrollView
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.list}>
                    {category.quizzes.map((quiz, index) => {
                        const result = progress.quizResults[quiz.id];
                        const isUnlocked = isLevelUnlocked(index);
                        const unlockRequirement = index > 0 && !isUnlocked ?
                            (() => {
                                const prevResult = progress.quizResults[category.quizzes[index - 1].id];
                                if (!prevResult) return "Terminer le niveau précédent";
                                const prevPercentage = (prevResult.score / prevResult.totalQuestions) * 100;
                                if (prevPercentage < 60) return `Obtenir 60%+ au niveau ${index}`;
                                return "";
                            })()
                            : null;

                        return (
                            <Pressable
                                key={quiz.id}
                                onPress={() => handlePress(quiz.id, index)}
                                disabled={!isUnlocked}
                                style={({ pressed }) => [
                                    styles.card,
                                    !isUnlocked && styles.cardLocked,
                                    pressed && isUnlocked && styles.cardPressed,
                                ]}
                            >
                                {/* Level Number Badge */}
                                <View style={[
                                    styles.levelBadge,
                                    isUnlocked ? styles.levelBadgeUnlocked : styles.levelBadgeLocked
                                ]}>
                                    <Text style={[
                                        styles.levelText,
                                        isUnlocked ? styles.levelTextUnlocked : styles.levelTextLocked
                                    ]}>
                                        {index + 1}
                                    </Text>
                                </View>

                                <View style={styles.cardContent}>
                                    <View style={styles.cardLeft}>
                                        <Text style={styles.quizTitle}>
                                            Niveau {index + 1}
                                        </Text>
                                        <Text style={styles.quizSubtitle}>{quiz.title}</Text>
                                        <Text style={styles.quizInfo}>{quiz.questions.length} questions</Text>

                                        {/* Lock requirement text */}
                                        {!isUnlocked && unlockRequirement && (
                                            <View style={styles.lockRequirement}>
                                                <Lock size={12} color={theme.colors.textSecondary} />
                                                <Text style={styles.lockRequirementText}>{unlockRequirement}</Text>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.cardRight}>
                                        {!categoryUnlocked ? (
                                            <Lock size={28} color={theme.colors.textSecondary} />
                                        ) : !isUnlocked ? (
                                            <Lock size={28} color={theme.colors.textSecondary} />
                                        ) : result ? (
                                            <View style={styles.resultContainer}>
                                                <View style={[styles.badgeIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                                                    {result.badge === 'platinum' && <Sparkles size={24} color={theme.colors.primary} />}
                                                    {result.badge === 'gold' && <Trophy size={24} color={theme.colors.primary} />}
                                                    {result.badge === 'silver' && <Star size={24} color={theme.colors.primary} />}
                                                    {result.badge === 'bronze' && <Zap size={24} color={theme.colors.primary} fill={theme.colors.primary} />}
                                                </View>
                                                <Text style={styles.scoreText}>{result.score}/{result.totalQuestions}</Text>
                                                <Text style={styles.percentageText}>
                                                    {Math.round((result.score / result.totalQuestions) * 100)}%
                                                </Text>
                                            </View>
                                        ) : (
                                            <View style={styles.playContainer}>
                                                <Play size={28} color={theme.colors.primary} fill={theme.colors.primary} />
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Completion message */}
                {categoryUnlocked && completedQuizzes === totalQuizzes && (
                    <View style={styles.completionCard}>
                        <Award size={48} color={theme.colors.primary} />
                        <Text style={styles.completionTitle}>Catégorie terminée !</Text>
                        <Text style={styles.completionText}>
                            Félicitations ! Vous avez complété tous les niveaux de cette catégorie.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Locked Level Modal */}
            <Modal
                visible={lockedLevel !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setLockedLevel(null)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setLockedLevel(null)}
                >
                    <View style={styles.modalContent}>
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            {/* Lock Icon */}
                            <View style={[styles.modalIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                                <Lock size={48} color={theme.colors.primary} strokeWidth={2.5} />
                            </View>

                            {/* Title */}
                            <Text style={styles.modalTitle}>Niveau {lockedLevel?.levelNumber} Verrouillé</Text>

                            {/* Requirement */}
                            <View style={styles.modalRequirementBox}>
                                <Text style={styles.modalRequirementLabel}>Condition requise :</Text>
                                <Text style={styles.modalRequirementText}>{lockedLevel?.requirement}</Text>
                            </View>

                            {/* Message */}
                            <Text style={styles.modalMessage}>
                                Complétez le niveau précédent pour débloquer celui-ci !
                            </Text>

                            {/* Button */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.modalButton,
                                    pressed && styles.modalButtonPressed,
                                ]}
                                onPress={() => setLockedLevel(null)}
                            >
                                <Text style={styles.modalButtonText}>Compris !</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}


const createCategoryStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        backgroundColor: theme.colors.primary,
        gap: 16,
    },

    backButton: {
        padding: 4,
    },

    headerContent: {
        flex: 1,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: 12,
    },

    categoryIcon: {
        fontSize: 36,
    },

    headerTextContainer: {
        flex: 1,
    },

    headerTitle: {
        fontSize: 20,
        color: theme.colors.textInverse,
        fontFamily: 'Inter_900Black',
    },

    headerSubtitle: {
        fontSize: 13,
        color: theme.colors.textInverse,
        opacity: 0.9,
        marginTop: 2,
    },

    progressSection: {
        backgroundColor: theme.colors.surface,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    progressHeader: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        marginBottom: 8,
    },

    progressTitle: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: theme.colors.text,
    },

    progressText: {
        fontSize: 13,
        color: theme.colors.textSecondary,
    },

    progressBarContainer: {
        height: 8,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 1,
        overflow: 'hidden' as const,
    },

    progressBar: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 1,
    },

    progressPercentage: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        textAlign: 'right' as const,
        marginTop: 4,
    },

    listContainer: {
        padding: 16,
        paddingBottom: 32,
    },

    list: {
        gap: 16,
    },

    card: {
        borderRadius: 1,
        padding: 20,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        position: 'relative' as const,
    },

    cardLocked: {
        opacity: 0.6,
    },

    cardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    levelBadge: {
        position: 'absolute' as const,
        top: -8,
        left: 16,
        width: 32,
        height: 32,
        borderRadius: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        borderWidth: 2,
        borderColor: theme.colors.surface,
    },

    levelBadgeUnlocked: {
        backgroundColor: theme.colors.primary,
    },

    levelBadgeLocked: {
        backgroundColor: theme.colors.backgroundSecondary,
    },

    levelText: {
        fontSize: 14,
        fontWeight: '700' as const,
    },

    levelTextUnlocked: {
        color: theme.colors.textInverse,
    },

    levelTextLocked: {
        color: theme.colors.textSecondary,
    },

    cardContent: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        alignItems: 'center' as const,
        marginTop: 4,
    },

    cardLeft: {
        flex: 1,
        gap: 4,
    },

    quizTitle: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: theme.colors.text,
    },

    quizSubtitle: {
        fontSize: 15,
        color: theme.colors.textSecondary,
    },

    quizInfo: {
        fontSize: 13,
        color: theme.colors.textTertiary,
    },

    lockRequirement: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: 6,
        marginTop: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 1,
        alignSelf: 'flex-start' as const,
    },

    lockRequirementText: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        fontWeight: '600' as const,
    },

    cardRight: {
        marginLeft: 12,
    },

    resultContainer: {
        alignItems: 'center' as const,
        gap: 4,
    },

    badgeIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },

    scoreText: {
        fontSize: 15,
        fontWeight: '700' as const,
        color: theme.colors.text,
    },

    percentageText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '600' as const,
    },

    playContainer: {
        width: 48,
        height: 48,
        borderRadius: 1,
        backgroundColor: theme.colors.primaryLight,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },

    completionCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 1,
        padding: 24,
        alignItems: 'center' as const,
        gap: 12,
        marginTop: 16,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },

    completionTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: theme.colors.text,
        fontFamily: 'Inter_900Black',
    },

    completionText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        textAlign: 'center' as const,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        padding: 20,
    },

    modalContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: 1,
        padding: 28,
        width: '100%',
        maxWidth: 380,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
    },

    modalIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        alignSelf: 'center' as const,
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: '800' as const,
        color: theme.colors.text,
        textAlign: 'center' as const,
        marginBottom: 20,
        fontFamily: 'Inter_900Black',
    },

    modalRequirementBox: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 1,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    modalRequirementLabel: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },

    modalRequirementText: {
        fontSize: 15,
        fontWeight: '700' as const,
        color: theme.colors.text,
    },

    modalMessage: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        textAlign: 'center' as const,
        lineHeight: 20,
        marginBottom: 20,
    },

    modalButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 1,
        alignItems: 'center' as const,
    },

    modalButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    modalButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: theme.colors.textInverse,
    },
});
