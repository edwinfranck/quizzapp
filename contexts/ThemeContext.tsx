import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeName, ThemeContextType } from '@/types/theme';
import { themes, themeList, defaultTheme } from '@/constants/themes';

const THEME_STORAGE_KEY = '@quizapp_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
    const [isLoading, setIsLoading] = useState(true);

    // Load saved theme on mount
    useEffect(() => {
        loadSavedTheme();
    }, []);

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && savedTheme in themes) {
                setThemeName(savedTheme as ThemeName);
            }
        } catch (error) {
            console.error('Error loading theme:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setTheme = async (newThemeName: ThemeName) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeName);
            setThemeName(newThemeName);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    const theme = themes[themeName];

    const value: ThemeContextType = {
        theme,
        themeName,
        setTheme,
        availableThemes: themeList,
    };

    // Show nothing while loading to avoid flash
    if (isLoading) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
