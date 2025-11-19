import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientBackgroundProps extends ViewProps {
    variant?: 'primary' | 'secondary' | 'accent';
}

export default function GradientBackground({
    variant = 'primary',
    style,
    children,
    ...props
}: GradientBackgroundProps) {
    const { theme } = useTheme();

    const getColors = (): [string, string] => {
        switch (variant) {
            case 'primary':
                return [theme.colors.primary, theme.colors.primaryDark];
            case 'secondary':
                return [theme.colors.secondary, theme.colors.secondaryDark];
            case 'accent':
                return [theme.colors.accent, theme.colors.accentLight];
            default:
                return [theme.colors.primary, theme.colors.primaryDark];
        }
    };

    return (
        <LinearGradient
            colors={getColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, style]}
            {...props}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
});
