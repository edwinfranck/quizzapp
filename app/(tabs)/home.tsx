import { useProgress } from '@/contexts/ProgressContext';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { categories } from '@/data/quizzes';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import {
  Trophy,
  Sparkles,
  Star,
  Lock,
  Play,
  Award,
  TrendingUp,
  Search,
  X,
  Zap,
  CheckCircle2,
} from 'lucide-react-native';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useMemo } from 'react';
import LockedChallengeModal from '@/components/LockedChallengeModal';

type FilterType = 'all' | 'unlocked' | 'locked' | 'completed';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { progress, isQuizUnlocked } = useProgress();
  const { profile } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showAll, setShowAll] = useState(false);
  const [lockedCategory, setLockedCategory] = React.useState<{
    title: string;
    requiredPoints: number;
    color: string;
  } | null>(null);

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = categories.reduce((acc, cat) => acc + cat.quizzes.length, 0);
  const completionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bonsoir';
    return 'Bonsoir';
  };

  // Filter and search categories
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const unlocked = isQuizUnlocked(category.requiredPoints);
      const completedQuizzesInCat = category.quizzes.filter(
        quiz => progress.quizResults[quiz.id]
      ).length;
      const isCompleted = completedQuizzesInCat === category.quizzes.length && category.quizzes.length > 0;

      // Search filter
      const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      let matchesFilter = true;
      if (activeFilter === 'unlocked') matchesFilter = unlocked && !isCompleted;
      if (activeFilter === 'locked') matchesFilter = !unlocked;
      if (activeFilter === 'completed') matchesFilter = isCompleted;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, categories, progress.quizResults]);

  // Generate styles from theme
  const styles = React.useMemo(() => createHomeStyles(theme), [theme]);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'unlocked', label: 'Débloqués' },
    { id: 'locked', label: 'Verrouillés' },
    { id: 'completed', label: 'Complétés' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accueil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* WELCOME CARD */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <View style={[styles.avatar, { backgroundColor: profile.avatar.backgroundColor }]}>
              <Image source={profile.avatar.image} style={styles.avatarImage} />
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{profile.name}</Text>
            </View>
          </View>
          <View style={styles.pointsBadge}>
            <Trophy size={20} color={theme.colors.primaryIcon} />
            <Text style={styles.pointsText}>{progress.totalPoints}</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
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

        {/* FILTER CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map(filter => (
            <Pressable
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.selectionAsync();
                }
                setActiveFilter(filter.id);
              }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === filter.id && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* QUICK STATS */}
        <View style={styles.quickStatsCard}>
          <View style={styles.quickStat}>
            <TrendingUp size={18} color={theme.colors.primary} />
            <Text style={styles.quickStatValue}>{Math.round(completionPercentage)}%</Text>
            <Text style={styles.quickStatLabel}>Progression</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStat}>
            <Zap size={18} color={theme.colors.primary} />
            <Text style={styles.quickStatValue}>{completedQuizzes}</Text>
            <Text style={styles.quickStatLabel}>Complétés</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStat}>
            <Award size={18} color={theme.colors.primary} />
            <Text style={styles.quickStatValue}>{Object.keys(progress.quizResults).length}</Text>
            <Text style={styles.quickStatLabel}>Badges</Text>
          </View>
        </View>

        {/* CATEGORIES GRID */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Résultats (${filteredCategories.length})` : 'Catégories'}
            </Text>
            {!searchQuery && (
              <Pressable
                onPress={() => {
                  if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                  }
                  router.push('/(tabs)/quizzes' as never);
                }}
                style={styles.seeMoreButton}
              >
                <Text style={styles.seeMoreText}>Voir plus</Text>
              </Pressable>
            )}
          </View>

          {filteredCategories.length > 0 ? (
            <>
              <View style={styles.categoriesGrid}>
                {(showAll || searchQuery || activeFilter !== 'all'
                  ? filteredCategories
                  : filteredCategories.slice(0, 4)
                ).map((category) => {
                  const unlocked = isQuizUnlocked(category.requiredPoints);
                  const completedQuizzesInCat = category.quizzes.filter(
                    quiz => progress.quizResults[quiz.id]
                  ).length;
                  const totalQuizzes = category.quizzes.length;
                  const categoryProgress = totalQuizzes > 0 ? (completedQuizzesInCat / totalQuizzes) * 100 : 0;
                  const isCompleted = completedQuizzesInCat === totalQuizzes && totalQuizzes > 0;

                  return (
                    <Pressable
                      key={category.id}
                      style={({ pressed }) => [
                        styles.categoryCard,
                        !unlocked && styles.categoryCardLocked,
                        pressed && unlocked && styles.categoryCardPressed,
                      ]}
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
                        router.push(`/category/${category.id}` as never);
                      }}
                    >
                      {/* Background accent bar */}
                      <View style={[styles.categoryAccent, { backgroundColor: category.color }]} />

                      {/* Completion badge */}
                      {unlocked && isCompleted && (
                        <View style={styles.completionBadge}>
                          <CheckCircle2 size={16} color={theme.colors.success} fill={theme.colors.success} />
                        </View>
                      )}

                      {/* Content */}
                      <View style={styles.categoryContent}>
                        {/* Icon and status */}
                        <View style={styles.categoryTop}>
                          <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                          </View>

                          {unlocked ? (
                            <View style={[styles.statusBadge, { backgroundColor: theme.colors.primaryLight }]}>
                              <Play size={14} color={theme.colors.primaryIcon} fill={theme.colors.primaryIcon} />
                            </View>
                          ) : (
                            <View style={[styles.statusBadge, { backgroundColor: theme.colors.backgroundSecondary }]}>
                              <Lock size={14} color={theme.colors.textSecondary} />
                            </View>
                          )}
                        </View>

                        {/* Title */}
                        <Text style={styles.categoryTitle} numberOfLines={2}>{category.title}</Text>

                        {/* Info */}
                        {unlocked ? (
                          <>
                            <Text style={styles.categoryInfo}>
                              {totalQuizzes} quiz • {category.quizzes.reduce((acc, q) => acc + q.questions.length, 0)} questions
                            </Text>

                            {/* Progress */}
                            {completedQuizzesInCat > 0 && (
                              <View style={styles.progressSection}>
                                <View style={styles.progressBarContainer}>
                                  <View
                                    style={[
                                      styles.progressBar,
                                      {
                                        width: `${categoryProgress}%`,
                                        backgroundColor: category.color
                                      }
                                    ]}
                                  />
                                </View>
                                <Text style={styles.progressText}>
                                  {completedQuizzesInCat}/{totalQuizzes}
                                </Text>
                              </View>
                            )}
                          </>
                        ) : (
                          <View style={styles.lockedInfo}>
                            <Lock size={12} color={theme.colors.error} />
                            <Text style={styles.lockedText}>
                              {category.requiredPoints} pts
                            </Text>
                          </View>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              {/* Voir plus/moins button */}
              {!searchQuery && activeFilter === 'all' && filteredCategories.length > 4 && (
                <Pressable
                  style={styles.showMoreButton}
                  onPress={() => {
                    if (Platform.OS !== 'web') {
                      Haptics.selectionAsync();
                    }
                    setShowAll(!showAll);
                  }}
                >
                  <Text style={styles.showMoreText}>
                    {showAll ? 'Voir moins' : `Voir plus (${filteredCategories.length - 4})`}
                  </Text>
                </Pressable>
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Search size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>Aucun résultat</Text>
              <Text style={styles.emptyStateText}>
                Essayez un autre terme de recherche ou filtre
              </Text>
            </View>
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

const createHomeStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    padding: 22,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  headerTitle: {
    fontSize: 28,
    color: theme.colors.textInverse,
    fontFamily: "Inter_900Black",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },

  // Welcome Card
  welcomeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 20,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  welcomeContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    flex: 1,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 1,
  },

  welcomeText: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  userName: {
    fontSize: 20,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },

  pointsBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 1,
  },

  pointsText: {
    fontSize: 18,
    color: theme.colors.primaryIcon,
    fontFamily: "Inter_900Black",
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
    padding: 0,
  },

  // Filter Chips
  filtersContainer: {
    gap: 8,
    paddingVertical: 4,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  filterChipText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },

  filterChipTextActive: {
    color: theme.colors.textInverse,
  },

  // Quick Stats
  quickStatsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 16,
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  quickStat: {
    alignItems: 'center' as const,
    gap: 4,
  },

  quickStatValue: {
    fontSize: 20,
    fontFamily: "Inter_900Black",
    color: theme.colors.text,
  },

  quickStatLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  quickStatDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },

  // Categories Section
  categoriesSection: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },

  sectionTitle: {
    fontSize: 18,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },

  seeMoreButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.primary,
  },

  categoriesGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 14,
  },

  categoryCard: {
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

  categoryCardLocked: {
    opacity: 0.7,
  },

  categoryCardPressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.04,
  },

  categoryAccent: {
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

  categoryContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between' as const,
  },

  categoryTop: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 12,
  },

  categoryIconContainer: {
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

  categoryIcon: {
    fontSize: 28,
  },

  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },

  categoryInfo: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
    marginBottom: 8,
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

  // Show More Button
  showMoreButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 14,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 4,
  },

  showMoreText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: theme.colors.primary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center' as const,
    padding: 40,
    gap: 12,
  },

  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },

  emptyStateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
});
