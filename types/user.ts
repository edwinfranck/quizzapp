export type Avatar = {
  id: string;
  image: any;
  backgroundColor: string;
  requiredPoints: number; // 0 = free/unlocked by default
};

export type UserProfile = {
  name: string;
  avatar: Avatar;
  hasCompletedOnboarding: boolean;
  unlockedAvatars: string[]; // Array of unlocked avatar IDs
};


export const AVAILABLE_AVATARS: Avatar[] = [
  { id: '1', image: require('../assets/avatar/1.png'), backgroundColor: '#e7e7e7ff', requiredPoints: 0 },
  { id: '2', image: require('../assets/avatar/2.png'), backgroundColor: '#3E2C29', requiredPoints: 0 },
  { id: '3', image: require('../assets/avatar/3.png'), backgroundColor: '#2A2B3C', requiredPoints: 0 },
  { id: '4', image: require('../assets/avatar/4.png'), backgroundColor: '#2D332F', requiredPoints: 100 },
  { id: '5', image: require('../assets/avatar/5.png'), backgroundColor: '#3A2E3D', requiredPoints: 200 },
  { id: '6', image: require('../assets/avatar/6.png'), backgroundColor: '#2E3A3A', requiredPoints: 300 },
  { id: '7', image: require('../assets/avatar/7.png'), backgroundColor: '#2E3A3A', requiredPoints: 400 },
  { id: '8', image: require('../assets/avatar/8.png'), backgroundColor: '#2E3A3A', requiredPoints: 500 },
  { id: '9', image: require('../assets/avatar/9.png'), backgroundColor: '#2E3A3A', requiredPoints: 600 },
  { id: '10', image: require('../assets/avatar/10.png'), backgroundColor: '#2E3A3A', requiredPoints: 700 },
  { id: '11', image: require('../assets/avatar/11.png'), backgroundColor: '#2E3A3A', requiredPoints: 800 },
  { id: '12', image: require('../assets/avatar/12.png'), backgroundColor: '#2E3A3A', requiredPoints: 900 },
  { id: '13', image: require('../assets/avatar/13.png'), backgroundColor: '#2E3A3A', requiredPoints: 1000 },
  { id: '14', image: require('../assets/avatar/14.png'), backgroundColor: '#2E3A3A', requiredPoints: 1100 },
  { id: '15', image: require('../assets/avatar/15.png'), backgroundColor: '#2E3A3A', requiredPoints: 1200 },
  { id: '16', image: require('../assets/avatar/16.png'), backgroundColor: '#2E3A3A', requiredPoints: 1300 },
  { id: '17', image: require('../assets/avatar/17.png'), backgroundColor: '#2E3A3A', requiredPoints: 1400 },
  { id: '18', image: require('../assets/avatar/18.png'), backgroundColor: '#2E3A3A', requiredPoints: 1500 },
  { id: '19', image: require('../assets/avatar/19.png'), backgroundColor: '#2E3A3A', requiredPoints: 1600 },
  { id: '20', image: require('../assets/avatar/20.png'), backgroundColor: '#2E3A3A', requiredPoints: 1700 },



];
