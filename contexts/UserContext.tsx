import { AVAILABLE_AVATARS, Avatar, UserProfile } from '@/types/user';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = '@quiz_user_profile';

const defaultProfile: UserProfile = {
  name: '',
  avatar: AVAILABLE_AVATARS[0],
  hasCompletedOnboarding: false,
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
      const newProfile: UserProfile = {
        name,
        avatar,
        hasCompletedOnboarding: true,
      };
      saveProfile(newProfile);
    },
    []
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
      resetProfile,
    }),
    [profile, isLoading, updateName, updateAvatar, completeOnboarding, resetProfile]
  );
});
