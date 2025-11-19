import { useProgress } from "@/contexts/ProgressContext";
import { useUser } from "@/contexts/UserContext";
import { quizzes } from "@/data/quizzes";
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
import { useState } from "react";
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
  const insets = useSafeAreaInsets();
  const { profile, updateName, updateAvatar } = useUser();
  const { progress, resetProgress } = useProgress();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const completedQuizzes = Object.keys(progress.quizResults).length;
  const totalQuizzes = quizzes.length;

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
                  {quizzes.find((q) => q.id === result.quizId)?.title}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B9F99",
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#7A9182",
  },
  headerTitle: {
    fontSize: 26,
    //fontWeight: '800' as const,
    fontFamily: "Inter_900Black",
    color: "#29392E",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  profileCard: {
    backgroundColor: "#7A9182",
    borderRadius: 4,
    padding: 32,
    alignItems: "center" as const,
    gap: 20,
    borderWidth: 0,
    borderColor: "#334155",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: "relative" as const,
  },
  avatarEmojiLarge: {
    fontSize: 52,
  },
  editBadge: {
    position: "absolute" as const,
    bottom: 0,
    right: 0,
    backgroundColor: "#8B9F99",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 0,
    borderColor: "#1E293B",
  },
  nameContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#29392E",
  },
  nameEditContainer: {
    width: "100%" as const,
    gap: 12,
  },
  nameInput: {
    backgroundColor: "#8B9F99",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: "#29392E",
    textAlign: "center" as const,
  },
  nameEditButtons: {
    flexDirection: "row" as const,
    gap: 12,
  },
  nameEditButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center" as const,
  },
  cancelButton: {
    backgroundColor: "#8B9F99",
  },
  saveButton: {
    backgroundColor: "#29392E",
  },
  cancelButtonText: {
    color: "#29392E",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  saveButtonText: {
    color: "#8B9F99",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  statsSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    //fontWeight: "700" as const,
    color: "#29392E",
    fontFamily: "Inter_900Black",
  },
  statsGrid: {
    flexDirection: "row" as const,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#7A9182",
    borderRadius: 4,
    padding: 16,
    alignItems: "center" as const,
    gap: 8,
    borderWidth: 0,
    borderColor: "#334155",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: "#29392E",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  statEmoji: {
    fontSize: 32,
  },
  statValue: {
    fontSize: 24,
    //fontWeight: "800" as const,
    color: "#29392E",
    fontFamily: "Inter_900Black",
  },
  statLabel: {
    fontSize: 12,
    color: "#29392E",
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
    backgroundColor: "#7A9182",
    borderRadius: 4,
    padding: 16,
    borderWidth: 0,
    borderColor: "#334155",
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
    borderRadius: 4,
    backgroundColor: "#334155",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  dangerIconContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#29392E",
  },
  settingDescription: {
    fontSize: 13,
    color: "#29392E",
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
    backgroundColor: "#7A9182",
    borderRadius: 4,
    padding: 16,
    alignItems: "center" as const,
    gap: 8,
    minWidth: 100,
    borderWidth: 0,
    borderColor: "#334155",
  },
  badgeEmoji: {
    fontSize: 36,
  },
  badgeLabel: {
    fontSize: 12,
    color: "#29392E",
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },
  noBadgesText: {
    fontSize: 14,
    color: "#64748B",
    fontStyle: "italic" as const,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end" as const,
  },
  modalContent: {
    backgroundColor: "#8B9F99",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#29392E",
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
    borderRadius: 4,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    position: "relative" as const,
  },
  avatarSelected: {
    borderWidth: 4,
    borderColor: "#29392E",
  },
  avatarOptionEmoji: {
    fontSize: 36,
  },
  checkmark: {
    position: "absolute" as const,
    top: -6,
    right: -6,
    backgroundColor: "#10B981",
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 2,
    borderColor: "#29392E",
  },
  checkmarkText: {
    color: "#29392E",
    fontSize: 14,
    fontWeight: "700" as const,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#29392E',
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
