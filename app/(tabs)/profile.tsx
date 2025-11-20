import { useProgress } from "@/contexts/ProgressContext";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
import { categories } from "@/data/quizzes";
import { AVAILABLE_AVATARS, Avatar } from "@/types/user";
import * as Haptics from "expo-haptics";
import { createProfileStyles } from '@/styles/profile.styles';
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
              <Edit2 size={14} color={theme.colors.textInverse} />
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
              <Edit2 size={18} color={theme.colors.text} />
            </Pressable>
          )}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Trophy size={28} color={theme.colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{progress.totalPoints}</Text>
                <Text style={styles.statLabel}>Points totaux</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <CheckCheck size={28} color={theme.colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{completedQuizzes}</Text>
                <Text style={styles.statLabel}>Quiz terminés</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TargetIcon size={28} color={theme.colors.primary} />
              </View>
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{totalQuizzes}</Text>
                <Text style={styles.statLabel}>Quiz totaux</Text>
              </View>
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
                <Sparkles size={20} color={theme.colors.primary} />
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
            <ChevronRight size={20} color={theme.colors.textSecondary} />
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
                <RotateCcw size={20} color={theme.colors.error} />
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
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Badges obtenus</Text>
          <View style={styles.badgesGrid}>
            {Object.values(progress.quizResults).map((result) => (
              <View key={result.quizId} style={styles.badgeItem}>
                <View style={styles.badgeIcon}>
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


