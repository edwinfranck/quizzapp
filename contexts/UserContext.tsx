import { AVAILABLE_AVATARS, Avatar, UserProfile } from '@/types/user';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@quiz_user_profile';

const defaultProfile: UserProfile = {
  name: '',
  avatar: AVAILABLE_AVATARS[0],
  hasCompletedOnboarding: false,
  unlockedAvatars: [],
};

export const [UserProvider, useUser] = createContextHook(() => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const updateName = useCallback(
    (name: string) => {
      const newProfile: UserProfile = {
        ...profile,
        name,
      };
      saveProfile(newProfile);
    },
    [profile]
  );

  const updateAvatar = useCallback(
    (avatar: Avatar) => {
      const newProfile: UserProfile = {
        ...profile,
        avatar,
      };
      saveProfile(newProfile);
    },
    [profile]
  );

  const completeOnboarding = useCallback(
    (name: string, avatar: Avatar) => {
      const freeAvatars = AVAILABLE_AVATARS.filter(a => a.requiredPoints === 0).map(a => a.id);
      const newProfile: UserProfile = {
        name,
        avatar,
        hasCompletedOnboarding: true,
        unlockedAvatars: freeAvatars,
      };
      saveProfile(newProfile);
    },
    []
  );

  const unlockAvatar = useCallback(
    (avatarId: string) => {
      if (!profile.unlockedAvatars.includes(avatarId)) {
        const newProfile: UserProfile = {
          ...profile,
          unlockedAvatars: [...profile.unlockedAvatars, avatarId],
        };
        saveProfile(newProfile);
      }
    },
    [profile]
  );

  const isAvatarUnlocked = useCallback(
    (avatarId: string) => {
      return profile.unlockedAvatars.includes(avatarId);
    },
    [profile]
  );

  const resetProfile = useCallback(async () => {
    await saveProfile(defaultProfile);
  }, []);

  return useMemo(
    () => ({
      profile,
      isLoading,
      updateName,
      updateAvatar,
      completeOnboarding,
      unlockAvatar,
      isAvatarUnlocked,
      resetProfile,
    }),
    [profile, isLoading, updateName, updateAvatar, completeOnboarding, unlockAvatar, isAvatarUnlocked, resetProfile]
  );
});
