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
  const { profile, updateName, updateAvatar } = useUser();
  const { progress, resetProgress } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = categories.reduce((acc, cat) => acc + cat.quizzes.length, 0);

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
    updateAvatar(avatar);
    setIsAvatarModalVisible(false);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              <Edit2 size={14} color="#29392E" />
            </View>
          </Pressable>

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
              <Edit2 size={18} color="#29392E" />
            </Pressable>
          )}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Trophy size={28} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{progress.totalPoints}</Text>
              <Text style={styles.statLabel}>Points totaux</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <CheckCheck size={28} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{completedQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz finis</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TargetIcon size={28} color="#8B9F99" />
              </View>
              <Text style={styles.statValue}>{totalQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz totaux</Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
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
              <View style={styles.settingIconContainer}>
                <Sparkles size={20} color="#8B9F99" />
              </View>
              <View>
                <Text style={styles.settingTitle}>
                  Thème de l'application
                </Text>
                <Text style={styles.settingDescription}>
                  Personnaliser les couleurs
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </Pressable>

          {/* Reset Progress */}
          <Pressable style={styles.settingItem} onPress={handleResetProgress}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.settingIconContainer,
                  styles.dangerIconContainer,
                ]}
              >
                <RotateCcw size={20} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.settingTitle}>
                  Réinitialiser la progression
                </Text>
                <Text style={styles.settingDescription}>
                  Effacer tous les résultats
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </Pressable>
        </View>

        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Badges obtenus</Text>
          <View style={styles.badgesGrid}>
            {Object.values(progress.quizResults).map((result) => (
              <View key={result.quizId} style={styles.badgeItem}>
                <View style={styles.badgeIcon}>
                  {result.badge === "platinum" && (
                    <Sparkles size={28} color="#8B9F99" />
                  )}
                  {result.badge === "gold" && (
                    <Trophy size={28} color="#8B9F99" />
                  )}
                  {result.badge === "silver" && (
                    <Star size={28} color="#8B9F99" />
                  )}
                  {result.badge === "bronze" && (
                    <Zap size={28} color="#8B9F99" fill="#8B9F99" />
                  )}
                </View>

                <Text style={styles.badgeLabel}>
                  {categories.flatMap(cat => cat.quizzes).find((q) => q.id === result.quizId)?.title}
                </Text>
              </View>
            ))}
            {Object.keys(progress.quizResults).length === 0 && (
              <Text style={styles.noBadgesText}>
                Aucun badge pour le moment
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

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
            <View style={styles.avatarsGrid}>
              {AVAILABLE_AVATARS.map((avatar) => (
                <Pressable
                  key={avatar.id}
                  style={[
                    styles.avatarOption,
                    { backgroundColor: avatar.backgroundColor },
                    profile.avatar.id === avatar.id && styles.avatarSelected,
                  ]}
                  onPress={() => handleAvatarSelect(avatar)}
                >
                  <Image source={avatar.image} style={styles.avatarImage} />
                  {profile.avatar.id === avatar.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </Pressable>
              ))}
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
    padding: 24,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
  },
  headerTop: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    //fontWeight: "800" as const,
    color: theme.colors.textInverse,
    fontFamily: "Inter_900Black",
  },
  themeButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  profileCard: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 16,
  },
  avatarContainer: {
    position: "relative" as const,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surface,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 3,
    borderColor: theme.colors.textInverse,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  editBadge: {
    position: "absolute" as const,
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  userName: {
    fontSize: 24,
    //fontWeight: "700" as const,
    color: theme.colors.textInverse,
    marginBottom: 4,
    fontFamily: "Inter_900Black",
  },
  userLevel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: "600" as const,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    gap: 32,
    paddingBottom: 100,
  },
  nameEditContainer: {
    gap: 12,
  },
  nameInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: theme.colors.text,
    textAlign: "center" as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  nameEditButtons: {
    flexDirection: "row" as const,
    gap: 12,
  },
  nameEditButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center" as const,
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "600" as const,
  },
  saveButtonText: {
    color: theme.colors.textInverse,
    fontSize: 16,
    fontWeight: "600" as const,
  },
  statsSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: theme.colors.text,
    fontFamily: "Inter_900Black",
  },
  statsGrid: {
    flexDirection: "row" as const,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: "center" as const,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  statEmoji: {
    fontSize: 32,
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
  settingsSection: {
    gap: 16,
  },
  settingItem: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  dangerIconContainer: {
    backgroundColor: theme.colors.errorLight,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: theme.colors.text,
  },
  settingDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  badgesSection: {
    gap: 16,
    marginBottom: 20,
  },
  badgesGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 12,
  },
  badgeItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: "center" as const,
    gap: 8,
    minWidth: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeEmoji: {
    fontSize: 36,
  },
  badgeLabel: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  noBadgesText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: "italic" as const,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: "center" as const,
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
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: "relative" as const,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  avatarSelected: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  avatarOptionEmoji: {
    fontSize: 36,
  },
  checkmark: {
    position: "absolute" as const,
    top: -6,
    right: -6,
    backgroundColor: theme.colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
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
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
});