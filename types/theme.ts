// Theme type definitions
export type ThemeColors = {
    // Primary colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary colors
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;

    // Accent
    accent: string;
    accentLight: string;

    // Backgrounds
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;

    // Surface (cards, modals)
    surface: string;
    surfaceSecondary: string;

    // Text
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    errorLight: string;
    info: string;

    // Borders
    border: string;
    borderLight: string;

    // Shadows
    shadow: string;
    
    //Icons
    primaryIcon: string;
};

export type ThemeName =
    | 'forest'
    | 'ocean'
    | 'sunset'
    | 'purple'
    | 'rose'
    | 'dark'
    | 'red';

export type Theme = {
    id: ThemeName;
    name: string;
    colors: ThemeColors;
    isDark: boolean;
};

export type ThemeContextType = {
    theme: Theme;
    themeName: ThemeName;
    setTheme: (themeName: ThemeName) => void;
    availableThemes: Theme[];
};
