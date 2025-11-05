export type Avatar = {
  id: string;
  emoji: string;
  backgroundColor: string;
};

export type UserProfile = {
  name: string;
  avatar: Avatar;
  hasCompletedOnboarding: boolean;
};

export const AVAILABLE_AVATARS: Avatar[] = [
  { id: '1', emoji: '😊', backgroundColor: '#3B82F6' },
  { id: '2', emoji: '🚀', backgroundColor: '#8B5CF6' },
  { id: '3', emoji: '🎮', backgroundColor: '#10B981' },
  { id: '4', emoji: '🌟', backgroundColor: '#F59E0B' },
  { id: '5', emoji: '🎨', backgroundColor: '#EF4444' },
  { id: '6', emoji: '🦄', backgroundColor: '#EC4899' },
  { id: '7', emoji: '🐱', backgroundColor: '#06B6D4' },
  { id: '8', emoji: '🎭', backgroundColor: '#6366F1' },
  { id: '9', emoji: '🏆', backgroundColor: '#14B8A6' },
  { id: '10', emoji: '🌈', backgroundColor: '#F97316' },
];
