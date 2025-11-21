import { useProgress } from '@/contexts/ProgressContext';
import { useTheme } from '@/contexts/ThemeContext';
import { categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Lock, Trophy, Star, Play, Sparkles, Zap, CheckCircle2, Award, Search, X } from 'lucide-react-native';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LockedChallengeModal from '@/components/LockedChallengeModal';

export default function QuizzesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { progress, isQuizUnlocked } = useProgress();
  const [lockedCategory, setLockedCategory] = React.useState<{
    title: string;
    requiredPoints: number;
    color: string;
  } | null>(null);

  // State for search and filters
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | 'unlocked' | 'locked' | 'completed'>('all');

  // Generate styles from theme
  const styles = React.useMemo(() => createQuizzesStyles(theme), [theme]);

  // Filter categories based on search and filter
  const filteredCategories = categories.filter((category) => {
    // Search filter
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Status filter
    if (selectedFilter === 'all') return true;

    const unlocked = isQuizUnlocked(category.requiredPoints);
    const completedQuizzes = category.quizzes.filter(quiz => progress.quizResults[quiz.id]).length;
    const totalQuizzes = category.quizzes.length;
    const isCompleted = completedQuizzes === totalQuizzes && totalQuizzes > 0;

    if (selectedFilter === 'unlocked') return unlocked;
    if (selectedFilter === 'locked') return !unlocked;
    if (selectedFilter === 'completed') return isCompleted;

    return true;
  });

  const handleFilterChange = (filter: typeof selectedFilter) => {
    setSelectedFilter(filter);
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };

  // Count categories by status
  const unlockedCount = categories.filter(c => isQuizUnlocked(c.requiredPoints)).length;
  const lockedCount = categories.length - unlockedCount;
  const completedCount = categories.filter(c => {
    const completed = c.quizzes.filter(q => progress.quizResults[q.id]).length;
    return completed === c.quizzes.length && c.quizzes.length > 0;
  }).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Quiz</Text>
          <Text style={styles.headerSubtitle}>{categories.length} catégories disponibles</Text>
        </View>

        <View style={styles.pointsBadge}>
          <Trophy size={20} color={theme.colors.textInverse} />
          <Text style={styles.pointsText}>{progress.totalPoints}</Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>

      {/* SEARCH AND FILTERS */}
      <View style={styles.searchFilterSection}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une catégorie..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <X size={20} color={theme.colors.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsContainer}
        >
          <Pressable
            style={[
              styles.filterChip,
              selectedFilter === 'all' && styles.filterChipActive,
            ]}
            onPress={() => handleFilterChange('all')}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === 'all' && styles.filterChipTextActive,
            ]}>
              Tous ({categories.length})
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterChip,
              selectedFilter === 'unlocked' && styles.filterChipActive,
            ]}
            onPress={() => handleFilterChange('unlocked')}
          >
            <Play size={16} color={selectedFilter === 'unlocked' ? theme.colors.textInverse : theme.colors.textSecondary} />
            <Text style={[
              styles.filterChipText,
              selectedFilter === 'unlocked' && styles.filterChipTextActive,
            ]}>
              Débloqués ({unlockedCount})
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterChip,
              selectedFilter === 'locked' && styles.filterChipActive,
            ]}
            onPress={() => handleFilterChange('locked')}
          >
            <Lock size={16} color={selectedFilter === 'locked' ? theme.colors.textInverse : theme.colors.textSecondary} />
            <Text style={[
              styles.filterChipText,
              selectedFilter === 'locked' && styles.filterChipTextActive,
            ]}>
              Verrouillés ({lockedCount})
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterChip,
              selectedFilter === 'completed' && styles.filterChipActive,
            ]}
            onPress={() => handleFilterChange('completed')}
          >
            <CheckCircle2 size={16} color={selectedFilter === 'completed' ? theme.colors.textInverse : theme.colors.textSecondary} />
            <Text style={[
              styles.filterChipText,
              selectedFilter === 'completed' && styles.filterChipTextActive,
            ]}>
              Complétés ({completedCount})
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* GRID LIST */}
      <ScrollView
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filteredCategories.length === 0 ? (
            <View style={styles.emptyState}>
              <Search size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>Aucun résultat</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery ? `Aucune catégorie ne correspond à "${searchQuery}"` : 'Aucune catégorie disponible'}
              </Text>
            </View>
          ) : (
            filteredCategories.map((category) => {
              const unlocked = isQuizUnlocked(category.requiredPoints);

              // Calculate progress for this category
              const completedQuizzes = category.quizzes.filter(
                quiz => progress.quizResults[quiz.id]
              ).length;
              const totalQuizzes = category.quizzes.length;
              const completionPercentage = totalQuizzes > 0
                ? (completedQuizzes / totalQuizzes) * 100
                : 0;
              const isCompleted = completedQuizzes === totalQuizzes && totalQuizzes > 0;

              // Calculate total questions
              const totalQuestions = category.quizzes.reduce((acc, q) => acc + q.questions.length, 0);

              return (
                <Pressable
                  key={category.id}
                  onPress={() => {
                    if (!unlocked) {
                      if (Platform.OS !== 'web') {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                      }
                      setLockedCategory({
                        title: category.title,
                        requiredPoints: category.requiredPoints,
                        color: category.color,
                      });
                      return;
                    }
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    router.push(`/category/${category.id}`);
                  }}
                  style={({ pressed }) => [
                    styles.card,
                    !unlocked && styles.cardLocked,
                    pressed && unlocked && styles.cardPressed,
                  ]}
                >
                  {/* Background gradient effect */}
                  <View style={[styles.cardBackground, { backgroundColor: category.color }]} />

                  {/* Completion badge */}
                  {unlocked && isCompleted && (
                    <View style={styles.completionBadge}>
                      <CheckCircle2 size={16} color={theme.colors.success} fill={theme.colors.success} />
                    </View>
                  )}

                  {/* Content */}
                  <View style={styles.cardContent}>
                    {/* Icon and status */}
                    <View style={styles.topRow}>
                      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                        <Text style={styles.icon}>{category.icon}</Text>
                      </View>

                      {unlocked ? (
                        <View style={[styles.statusBadge, { backgroundColor: theme.colors.primaryLight }]}>
                          <Play size={14} color={theme.colors.primary} fill={theme.colors.primary} />
                        </View>
                      ) : (
                        <View style={[styles.statusBadge, { backgroundColor: theme.colors.backgroundSecondary }]}>
                          <Lock size={14} color={theme.colors.textSecondary} />
                        </View>
                      )}
                    </View>

                    {/* Title */}
                    <Text style={styles.title} numberOfLines={2}>{category.title}</Text>

                    {/* Info */}
                    {unlocked ? (
                      <>
                        <View style={styles.infoRow}>
                          <Text style={styles.infoText}>{totalQuizzes} quiz</Text>
                          <View style={styles.dot} />
                          <Text style={styles.infoText}>{totalQuestions} questions</Text>
                        </View>

                        {/* Progress bar */}
                        {completedQuizzes > 0 && (
                          <View style={styles.progressSection}>
                            <View style={styles.progressBarContainer}>
                              <View
                                style={[
                                  styles.progressBar,
                                  {
                                    width: `${completionPercentage}%`,
                                    backgroundColor: category.color
                                  }
                                ]}
                              />
                            </View>
                            <Text style={styles.progressText}>
                              {completedQuizzes}/{totalQuizzes} complétés
                            </Text>
                          </View>
                        )}
                      </>
                    ) : (
                      <View style={styles.lockedInfo}>
                        <Lock size={12} color={theme.colors.error} />
                        <Text style={styles.lockedText}>
                          {category.requiredPoints} pts requis
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Locked Challenge Modal */}
      <LockedChallengeModal
        visible={lockedCategory !== null}
        onClose={() => setLockedCategory(null)}
        categoryTitle={lockedCategory?.title || ''}
        requiredPoints={lockedCategory?.requiredPoints || 0}
        currentPoints={progress.totalPoints}
        categoryColor={lockedCategory?.color || theme.colors.primary}
      />
    </View>
  );
}


const createQuizzesStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  headerTitle: {
    fontSize: 28,
    color: theme.colors.textInverse,
    fontFamily: 'Inter_900Black',
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 13,
    color: theme.colors.textInverse,
    opacity: 0.85,
  },

  pointsBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 1,
  },

  pointsText: {
    color: theme.colors.textInverse,
    fontSize: 18,
    fontFamily: 'Inter_900Black',
  },

  pointsLabel: {
    color: theme.colors.textInverse,
    fontSize: 12,
    opacity: 0.9,
  },

  gridContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  grid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 14,
  },

  card: {
    width: '48%',
    borderRadius: 1,
    minHeight: 200,
    overflow: 'hidden' as const,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },

  cardLocked: {
    opacity: 0.7,
  },

  cardPressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.04,
  },

  cardBackground: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },

  completionBadge: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: theme.colors.success,
    zIndex: 10,
  },

  cardContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between' as const,
  },

  topRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 12,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  icon: {
    fontSize: 28,
  },

  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  title: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },

  infoRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 12,
  },

  infoText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.textSecondary,
  },

  progressSection: {
    gap: 6,
  },

  progressBarContainer: {
    height: 6,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 1,
    overflow: 'hidden' as const,
  },

  progressBar: {
    height: '100%',
    borderRadius: 1,
  },

  progressText: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    fontWeight: '600' as const,
  },

  lockedInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 1,
    alignSelf: 'flex-start' as const,
  },

  lockedText: {
    fontSize: 12,
    color: theme.colors.error,
    fontWeight: '700' as const,
  },

  // Search and Filter Styles
  searchFilterSection: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  searchContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
  },

  filterChipsContainer: {
    gap: 8,
    paddingHorizontal: 2,
  },

  filterChip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  filterChipText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
  },

  filterChipTextActive: {
    color: theme.colors.textInverse,
  },

  emptyState: {
    width: '100%',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 60,
    gap: 12,
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },

  emptyStateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
    paddingHorizontal: 40,
  },
});
