import { ProgressProvider } from "@/contexts/ProgressContext";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <Stack screenOptions={{
      headerShown: false,
      headerBackTitle: "Retour",
      contentStyle: { backgroundColor: theme.colors.background }
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="quiz/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="settings/theme" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <UserProvider>
            <ProgressProvider>
              <RootLayoutNav />
            </ProgressProvider>
          </UserProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
