import { useProgress } from "@/contexts/ProgressContext";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
import { categories } from "@/data/quizzes";
import { AVAILABLE_AVATARS, Avatar } from "@/types/user";
import * as Haptics from "expo-haptics";
import {
  CheckCheck,
  ChevronRight,
  Edit2,
  RotateCcw,
  Sparkles,
  Star,
  TargetIcon,
  Trophy,
  Zap,
  Award,
  TrendingUp,
  Lock,
} from "lucide-react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { profile, updateName, updateAvatar, unlockAvatar, isAvatarUnlocked } = useUser();
  const { progress, resetProgress } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = categories.reduce((acc, cat) => acc + cat.quizzes.length, 0);
  const completionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;

  // Calculate badge counts
  const badgeCounts = {
    platinum: Object.values(progress.quizResults).filter(r => r.badge === 'platinum').length,
    gold: Object.values(progress.quizResults).filter(r => r.badge === 'gold').length,
    silver: Object.values(progress.quizResults).filter(r => r.badge === 'silver').length,
    bronze: Object.values(progress.quizResults).filter(r => r.badge === 'bronze').length,
  };

  // Generate styles from theme
  const styles = React.useMemo(() => createProfileStyles(theme), [theme]);

  const handleSaveName = () => {
    if (tempName.trim().length >= 2) {
      updateName(tempName.trim());
      setIsEditingName(false);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleAvatarSelect = (avatar: Avatar) => {
    // Check if avatar is unlocked
    if (!isAvatarUnlocked(avatar.id)) {
      // Check if user has enough points to unlock
      if (progress.totalPoints >= avatar.requiredPoints) {
        // Unlock the avatar
        unlockAvatar(avatar.id);
        updateAvatar(avatar);
        setIsAvatarModalVisible(false);
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } else {
        // Not enough points
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    } else {
      // Avatar is already unlocked, just select it
      updateAvatar(avatar);
      setIsAvatarModalVisible(false);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  const handleResetProgress = () => {
    if (Platform.OS === "web") {
      const confirm = window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible."
      );
      if (confirm) {
        resetProgress();
      }
    } else {
      Alert.alert(
        "Réinitialiser la progression",
        "Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Réinitialiser",
            style: "destructive",
            onPress: () => {
              resetProgress();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
            },
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Pressable
            style={[
              styles.avatarLarge,
              { backgroundColor: profile.avatar.backgroundColor },
            ]}
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.selectionAsync();
              }
              setIsAvatarModalVisible(true);
            }}
          >
            <Image source={profile.avatar.image} style={styles.avatarImage} />
            <View style={styles.editBadge}>
              <Edit2 size={14} color={theme.colors.textInverse} />
            </View>
          </Pressable>

          <View style={styles.profileInfo}>
            {isEditingName ? (
              <View style={styles.nameEditContainer}>
                <TextInput
                  style={styles.nameInput}
                  value={tempName}
                  onChangeText={setTempName}
                  maxLength={20}
                  autoFocus
                  autoCapitalize="words"
                />
                <View style={styles.nameEditButtons}>
                  <Pressable
                    style={[styles.nameEditButton, styles.cancelButton]}
                    onPress={() => {
                      setTempName(profile.name);
                      setIsEditingName(false);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.nameEditButton, styles.saveButton]}
                    onPress={handleSaveName}
                    disabled={tempName.trim().length < 2}
                  >
                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <>
                <Pressable
                  style={styles.nameContainer}
                  onPress={() => {
                    if (Platform.OS !== "web") {
                      Haptics.selectionAsync();
                    }
                    setIsEditingName(true);
                  }}
                >
                  <Text style={styles.userName}>{profile.name}</Text>
                  <Edit2 size={16} color={theme.colors.textSecondary} />
                </Pressable>
                <View style={styles.pointsContainer}>
                  <Trophy size={16} color={theme.colors.primary} />
                  <Text style={styles.pointsText}>{progress.totalPoints} points</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* QUICK STATS */}
        <View style={styles.quickStatsCard}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>{completedQuizzes}</Text>
            <Text style={styles.quickStatLabel}>Quiz terminés</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>{Math.round(completionPercentage)}%</Text>
            <Text style={styles.quickStatLabel}>Progression</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>{Object.keys(progress.quizResults).length}</Text>
            <Text style={styles.quickStatLabel}>Badges</Text>
          </View>
        </View>

        {/* STATISTICS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques détaillées</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Trophy size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>{progress.totalPoints}</Text>
              <Text style={styles.statLabel}>Points totaux</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <CheckCheck size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>{completedQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz réussis</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <TargetIcon size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>{totalQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz totaux</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <TrendingUp size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>{Math.round(completionPercentage)}%</Text>
              <Text style={styles.statLabel}>Progression</Text>
            </View>
          </View>
        </View>

        {/* BADGES SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges obtenus</Text>

          {Object.keys(progress.quizResults).length > 0 ? (
            <>
              {/* Badge Summary */}
              <View style={styles.badgeSummary}>
                {badgeCounts.platinum > 0 && (
                  <View style={styles.badgeSummaryItem}>
                    <Sparkles size={20} color={theme.colors.primary} />
                    <Text style={styles.badgeSummaryText}>{badgeCounts.platinum}x Platine</Text>
                  </View>
                )}
                {badgeCounts.gold > 0 && (
                  <View style={styles.badgeSummaryItem}>
                    <Trophy size={20} color={theme.colors.primary} />
                    <Text style={styles.badgeSummaryText}>{badgeCounts.gold}x Or</Text>
                  </View>
                )}
                {badgeCounts.silver > 0 && (
                  <View style={styles.badgeSummaryItem}>
                    <Star size={20} color={theme.colors.primary} />
                    <Text style={styles.badgeSummaryText}>{badgeCounts.silver}x Argent</Text>
                  </View>
                )}
                {badgeCounts.bronze > 0 && (
                  <View style={styles.badgeSummaryItem}>
                    <Zap size={20} color={theme.colors.primary} fill={theme.colors.primary} />
                    <Text style={styles.badgeSummaryText}>{badgeCounts.bronze}x Bronze</Text>
                  </View>
                )}
              </View>

              {/* Badge Grid */}
              <View style={styles.badgesGrid}>
                {Object.values(progress.quizResults).map((result) => (
                  <View key={result.quizId} style={styles.badgeItem}>
                    <View style={[styles.badgeIconContainer]}>
                      {result.badge === "platinum" && (
                        <Sparkles size={28} color={theme.colors.primary} />
                      )}
                      {result.badge === "gold" && (
                        <Trophy size={28} color={theme.colors.primary} />
                      )}
                      {result.badge === "silver" && (
                        <Star size={28} color={theme.colors.primary} />
                      )}
                      {result.badge === "bronze" && (
                        <Zap size={28} color={theme.colors.primary} fill={theme.colors.primary} />
                      )}
                    </View>
                    <Text style={styles.badgeLabel} numberOfLines={2}>
                      {categories.flatMap(cat => cat.quizzes).find((q) => q.id === result.quizId)?.title}
                    </Text>
                    <Text style={styles.badgeScore}>{result.score}/{result.totalQuestions}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.emptyBadges}>
              <Award size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyBadgesTitle}>Aucun badge pour le moment</Text>
              <Text style={styles.emptyBadgesText}>
                Complétez des quiz pour gagner vos premiers badges !
              </Text>
            </View>
          )}
        </View>

        {/* SETTINGS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>

          {/* Theme Selection */}
          <Pressable
            style={styles.settingItem}
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.selectionAsync();
              }
              router.push('/settings/theme' as never);
            }}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconContainer, { backgroundColor: theme.colors.primaryLight }]}>
                <Sparkles size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Thème de l'application</Text>
                <Text style={styles.settingDescription}>Personnaliser les couleurs</Text>
              </View>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </Pressable>

          {/* Reset Progress */}
          <Pressable style={styles.settingItem} onPress={handleResetProgress}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIconContainer, { backgroundColor: theme.colors.errorLight }]}>
                <RotateCcw size={20} color={theme.colors.error} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Réinitialiser la progression</Text>
                <Text style={styles.settingDescription}>Effacer tous les résultats</Text>
              </View>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>

      {/* AVATAR MODAL */}
      <Modal
        visible={isAvatarModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAvatarModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsAvatarModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir un avatar</Text>
            <Text style={styles.modalSubtitle}>Vos points: {progress.totalPoints}</Text>
            <View style={styles.avatarsGrid}>
              {AVAILABLE_AVATARS.map((avatar) => {
                const isUnlocked = isAvatarUnlocked(avatar.id);
                const canUnlock = progress.totalPoints >= avatar.requiredPoints;

                return (
                  <Pressable
                    key={avatar.id}
                    style={[
                      styles.avatarOption,
                      { backgroundColor: avatar.backgroundColor },
                      profile.avatar.id === avatar.id && styles.avatarSelected,
                      !isUnlocked && !canUnlock && styles.avatarLocked,
                    ]}
                    onPress={() => handleAvatarSelect(avatar)}
                  >
                    <Image
                      source={avatar.image}
                      style={[
                        styles.avatarOptionImage,
                        !isUnlocked && styles.avatarImageLocked,
                      ]}
                    />
                    {!isUnlocked && (
                      <View style={styles.lockOverlay}>
                        <Lock size={20} color="#FFFFFF" />
                        <Text style={styles.lockText}>{avatar.requiredPoints}pts</Text>
                        {canUnlock && (
                          <Text style={styles.unlockText}>Tap to unlock!</Text>
                        )}
                      </View>
                    )}
                    {profile.avatar.id === avatar.id && isUnlocked && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}


const createProfileStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollView: {
    flex: 1,
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

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 20,
  },

  // Profile Card
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: 'relative' as const,
  },

  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 1,
  },

  editBadge: {
    position: "absolute" as const,
    bottom: -4,
    right: -4,
    backgroundColor: theme.colors.primary,
    width: 28,
    height: 28,
    borderRadius: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },

  profileInfo: {
    flex: 1,
    gap: 8,
  },

  nameContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },

  userName: {
    fontSize: 22,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },

  pointsContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },

  pointsText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  nameEditContainer: {
    gap: 12,
  },

  nameInput: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  nameEditButtons: {
    flexDirection: "row" as const,
    gap: 8,
  },

  nameEditButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 1,
    alignItems: "center" as const,
  },

  cancelButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  saveButton: {
    backgroundColor: theme.colors.primary,
  },

  cancelButtonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "600" as const,
  },

  saveButtonText: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: "600" as const,
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
    fontSize: 24,
    fontFamily: "Inter_900Black",
    color: theme.colors.primary,
  },

  quickStatLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  quickStatDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },

  // Section
  section: {
    gap: 16,
  },

  sectionTitle: {
    fontSize: 18,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },

  statCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 16,
    alignItems: 'center' as const,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  statValue: {
    fontSize: 24,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },

  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },

  // Badges
  badgeSummary: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },

  badgeSummaryItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 1,
  },

  badgeSummaryText: {
    fontSize: 13,
    color: theme.colors.text,
    fontWeight: '600' as const,
  },

  badgesGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 12,
  },

  badgeItem: {
    width: '30%',
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 12,
    alignItems: "center" as const,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  badgeLabel: {
    fontSize: 11,
    color: theme.colors.text,
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },

  badgeScore: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: '600' as const,
  },

  emptyBadges: {
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 32,
    alignItems: 'center' as const,
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  emptyBadgesTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },

  emptyBadgesText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },

  // Settings
  settingItem: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    backgroundColor: theme.colors.surface,
    borderRadius: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  settingLeft: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    flex: 1,
  },

  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  settingText: {
    flex: 1,
    gap: 2,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: theme.colors.text,
  },

  settingDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end" as const,
  },

  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: "center" as const,
  },

  modalSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: "center" as const,
    marginBottom: 20,
    fontWeight: "600" as const,
  },

  avatarsGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 12,
    justifyContent: "center" as const,
  },

  avatarOption: {
    width: 70,
    height: 70,
    borderRadius: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: "relative" as const,
  },

  avatarSelected: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },

  avatarLocked: {
    opacity: 0.6,
  },

  avatarOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 1,
  },

  avatarImageLocked: {
    opacity: 0.4,
  },

  lockOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 1,
    gap: 2,
  },

  lockText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700" as const,
  },

  unlockText: {
    color: theme.colors.success,
    fontSize: 9,
    fontWeight: "700" as const,
  },

  checkmark: {
    position: "absolute" as const,
    top: -6,
    right: -6,
    backgroundColor: theme.colors.success,
    width: 24,
    height: 24,
    borderRadius: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },

  checkmarkText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700" as const,
  },
});
