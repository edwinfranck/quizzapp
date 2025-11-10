import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import Animated, {
  withTiming,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

import {
  Home,
  HomeIcon,
  Brain,
  BrainCircuit,
  User,
  UserRound,
} from "lucide-react-native";

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";

const ACTIVE_BG = "#1f3329";         // Fond de la bulle, style WhatsApp
const ACTIVE_ICON_COLOR = "#ffffff";  
const INACTIVE_ICON_COLOR = "#1f3329";
const LABEL_INACTIVE = "#1f3329";



const TABS = [
  {
    name: "home",
    title: "Accueil",
    active: HomeIcon,
    inactive: Home,
  },
  {
    name: "quizzes",
    title: "Quiz",
    active: BrainCircuit,
    inactive: Brain,
  },
  {
    name: "profile",
    title: "Profil",
    active: UserRound,
    inactive: User,
  },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = focused ? TABS[index].active : TABS[index].inactive;

        // ✅ Bounce léger & rapide sur l’icône (style WhatsApp)
        const iconStyle = useAnimatedStyle(() => ({
          transform: [
            {
              scale: withSpring(focused ? 1.03 : 1, {
                damping: 18,       // ✅ très léger rebond
                stiffness: 300,    // ✅ rapide
              }),
            },
          ],
        }));

        // ✅ Bulle : fade + scale WhatsApp
        const bubbleStyle = useAnimatedStyle(() => ({
          opacity: withTiming(focused ? 1 : 0, { duration: 120 }), // ✅ fade court
          transform: [
            {
              scale: withSpring(focused ? 1 : 0.92, {
                damping: 22,      // ✅ presque aucun rebond
                stiffness: 230,   // ✅ rapide
              }),
            },
          ],
        }));

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
          >
            <Animated.View style={[styles.bubble, bubbleStyle]} />

            <Animated.View style={iconStyle}>
              <Icon
                size={20}
                color={focused ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
              />
            </Animated.View>

            <Text style={[styles.label, focused && styles.labelFocused]}>
              {TABS[index].title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) return null;
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="quizzes" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#7A9182", // WhatsApp Dark Mode
    paddingBottom: 10,
    borderTopColor: "#1b2927",
    //borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: LABEL_INACTIVE,
    fontFamily: "Inter_600SemiBold",
  },
  labelFocused: {
    color: "#1f3329",
    //fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  bubble: {
    position: "absolute",
    top: 8,
    width: 40,
    height: 30,
    backgroundColor: ACTIVE_BG,
    borderRadius: 4,
    zIndex: -1,
  },
});
