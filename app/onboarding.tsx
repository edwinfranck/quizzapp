import { useUser } from '@/contexts/UserContext';
import { AVAILABLE_AVATARS, Avatar } from '@/types/user';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useUser();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(AVAILABLE_AVATARS[0]);

  const handleAvatarSelect = (avatar: Avatar) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    setSelectedAvatar(avatar);
  };

  const handleStart = () => {
    if (name.trim().length < 2) {
      return;
    }

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    completeOnboarding(name.trim(), selectedAvatar);
    router.replace('/home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sparkles size={48} color="#FFD700" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>Bienvenue!</Text>
          <Text style={styles.subtitle}>Créez votre profil pour commencer</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Votre nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom"
              placeholderTextColor="#64748B"
              value={name}
              onChangeText={setName}
              maxLength={20}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.avatarSection}>
            <Text style={styles.label}>Choisissez votre avatar</Text>
            <View style={styles.avatarsGrid}>
              {AVAILABLE_AVATARS.map((avatar) => (
                <Pressable
                  key={avatar.id}
                  style={[
                    styles.avatarButton,
                    { backgroundColor: avatar.backgroundColor },
                    selectedAvatar.id === avatar.id && styles.avatarSelected,
                  ]}
                  onPress={() => handleAvatarSelect(avatar)}
                >
                  <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
                  {selectedAvatar.id === avatar.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <Pressable
          style={[
            styles.startButton,
            (!name.trim() || name.trim().length < 2) && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={!name.trim() || name.trim().length < 2}
        >
          <Text style={styles.startButtonText}>C'est parti !</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#335148',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center' as const,
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    //fontWeight: '800' as const,
    fontFamily: 'Inter_900Black',
    color: '#FFFFFF',
    //marginBottom: 12,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center' as const,
  },
  form: {
    gap: 32,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#7A9182',
    borderRadius: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#334155',
  },
  avatarSection: {
    gap: 16,
  },
  avatarsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
    justifyContent: 'center' as const,
  },
  avatarButton: {
    width: 70,
    height: 70,
    borderRadius: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    position: 'relative' as const,
  },
  avatarSelected: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  checkmark: {
    position: 'absolute' as const,
    top: -6,
    right: -6,
    backgroundColor: '#10B981',
    width: 24,
    height: 24,
    borderRadius: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700' as const,
  },
  startButton: {
    backgroundColor: '#29392E',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 4,
    alignItems: 'center' as const,
    //shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 0,
  },
  startButtonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700' as const,
  },
});
