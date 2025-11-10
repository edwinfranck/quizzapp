export type Avatar = {
  id: string;
  image: any;
  backgroundColor: string;
};

export type UserProfile = {
  name: string;
  avatar: Avatar;
  hasCompletedOnboarding: boolean;
};


export const AVAILABLE_AVATARS: Avatar[] = [
  { id: '1', image: require('../assets/avatar/1.png'), backgroundColor: '#29392E' },
  { id: '2', image: require('../assets/avatar/2.png'), backgroundColor: '#3E2C29' },
  { id: '3', image: require('../assets/avatar/3.png'), backgroundColor: '#2A2B3C' },
  { id: '4', image: require('../assets/avatar/4.png'), backgroundColor: '#2D332F' },
  { id: '5', image: require('../assets/avatar/5.png'), backgroundColor: '#3A2E3D' },
  { id: '6', image: require('../assets/avatar/6.png'), backgroundColor: '#2E3A3A' },
  { id: '7', image: require('../assets/avatar/7.png'), backgroundColor: '#2E3A3A' },
  { id: '8', image: require('../assets/avatar/8.png'), backgroundColor: '#2E3A3A' },
  { id: '9', image: require('../assets/avatar/9.png'), backgroundColor: '#2E3A3A' },
  
];

