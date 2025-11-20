import { Theme, ThemeName } from '@/types/theme';

// Forest Green Theme (Current, improved)
const forestTheme: Theme = {
    id: 'forest',
    name: 'Forest Green',
    isDark: false,
    colors: {
        primary: '#7A9182',
        primaryLight: '#8B9F99',
        primaryDark: '#5d6e63',

        secondary: '#8B9F99',
        secondaryLight: '#A3B5AD',
        secondaryDark: '#6B7D75',

        accent: '#5d6e63',
        accentLight: '#7A8A7F',

        background: '#F8FAFC',
        backgroundSecondary: '#F1F5F9',
        backgroundTertiary: '#E2E8F0',

        surface: '#FFFFFF',
        surfaceSecondary: '#F8FAFC',

        text: '#29392E',
        textSecondary: '#475569',
        textTertiary: '#64748B',
        textInverse: '#FFFFFF',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#FEE2E2',
        info: '#3B82F6',

        border: '#E2E8F0',
        borderLight: '#F1F5F9',

        shadow: '#000000',
    },
};

// Ocean Blue Theme
const oceanTheme: Theme = {
    id: 'ocean',
    name: 'Ocean Blue',
    isDark: false,
    colors: {
        primary: '#4A90E2',
        primaryLight: '#5BA3F5',
        primaryDark: '#2E5C8A',

        secondary: '#5BA3F5',
        secondaryLight: '#7BB8FF',
        secondaryDark: '#3B7BC9',

        accent: '#2E5C8A',
        accentLight: '#4A7CAF',

        background: '#F0F7FF',
        backgroundSecondary: '#E6F2FF',
        backgroundTertiary: '#D6EBFF',

        surface: '#FFFFFF',
        surfaceSecondary: '#F0F7FF',

        text: '#1A3A52',
        textSecondary: '#2E5C8A',
        textTertiary: '#4A7CAF',
        textInverse: '#FFFFFF',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#DBEAFE',
        info: '#3B82F6',

        border: '#D6EBFF',
        borderLight: '#E6F2FF',

        shadow: '#000000',
    },
};

// Sunset Orange Theme
const sunsetTheme: Theme = {
    id: 'sunset',
    name: 'Sunset Orange',
    isDark: false,
    colors: {
        primary: '#FF6B35',
        primaryLight: '#FF8C61',
        primaryDark: '#D94F1F',

        secondary: '#FF8C61',
        secondaryLight: '#FFB08F',
        secondaryDark: '#E66B3D',

        accent: '#D94F1F',
        accentLight: '#E66B3D',

        background: '#FFF5F0',
        backgroundSecondary: '#FFEBE0',
        backgroundTertiary: '#FFD9C7',

        surface: '#FFFFFF',
        surfaceSecondary: '#FFF5F0',

        text: '#4A2C1A',
        textSecondary: '#6B4428',
        textTertiary: '#8C5C36',
        textInverse: '#FFFFFF',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#FEE2E2',
        info: '#3B82F6',

        border: '#FFD9C7',
        borderLight: '#FFEBE0',

        shadow: '#000000',
    },
};

// Purple Dream Theme
const purpleTheme: Theme = {
    id: 'purple',
    name: 'Purple Dream',
    isDark: false,
    colors: {
        primary: '#8B5CF6',
        primaryLight: '#A78BFA',
        primaryDark: '#6D28D9',

        secondary: '#A78BFA',
        secondaryLight: '#C4B5FD',
        secondaryDark: '#7C3AED',

        accent: '#6D28D9',
        accentLight: '#8B5CF6',

        background: '#FAF5FF',
        backgroundSecondary: '#F3E8FF',
        backgroundTertiary: '#E9D5FF',

        surface: '#FFFFFF',
        surfaceSecondary: '#FAF5FF',

        text: '#3B1F5C',
        textSecondary: '#5B21B6',
        textTertiary: '#7C3AED',
        textInverse: '#FFFFFF',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#F3E8FF',
        info: '#3B82F6',

        border: '#E9D5FF',
        borderLight: '#F3E8FF',

        shadow: '#000000',
    },
};

// Rose Gold Theme
const roseTheme: Theme = {
    id: 'rose',
    name: 'Rose Gold',
    isDark: false,
    colors: {
        primary: '#E91E63',
        primaryLight: '#F06292',
        primaryDark: '#AD1457',

        secondary: '#F06292',
        secondaryLight: '#F48FB1',
        secondaryDark: '#D81B60',

        accent: '#AD1457',
        accentLight: '#C2185B',

        background: '#FFF0F5',
        backgroundSecondary: '#FFE4EC',
        backgroundTertiary: '#FFD1DC',

        surface: '#FFFFFF',
        surfaceSecondary: '#FFF0F5',

        text: '#4A1929',
        textSecondary: '#880E4F',
        textTertiary: '#AD1457',
        textInverse: '#FFFFFF',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#FFE4EC',
        info: '#3B82F6',

        border: '#FFD1DC',
        borderLight: '#FFE4EC',

        shadow: '#000000',
    },
};

// Dark Mode Theme
const darkTheme: Theme = {
    id: 'dark',
    name: 'Dark Mode',
    isDark: true,
    colors: {
        primary: '#334155',
        primaryLight: '#475569',
        primaryDark: '#1E293B',

        secondary: '#475569',
        secondaryLight: '#64748B',
        secondaryDark: '#334155',

        accent: '#0F172A',
        accentLight: '#1E293B',

        background: '#0F172A',
        backgroundSecondary: '#1E293B',
        backgroundTertiary: '#334155',

        surface: '#1E293B',
        surfaceSecondary: '#334155',

        text: '#F1F5F9',
        textSecondary: '#CBD5E1',
        textTertiary: '#94A3B8',
        textInverse: '#0F172A',

        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        errorLight: '#7F1D1D',
        info: '#3B82F6',

        border: '#334155',
        borderLight: '#475569',

        shadow: '#000000',
    },
};

export const themes: Record<ThemeName, Theme> = {
    forest: forestTheme,
    ocean: oceanTheme,
    sunset: sunsetTheme,
    purple: purpleTheme,
    rose: roseTheme,
    dark: darkTheme,
};

export const themeList: Theme[] = Object.values(themes);

export const defaultTheme: ThemeName = 'forest';
