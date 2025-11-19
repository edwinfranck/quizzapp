import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedViewProps extends ViewProps {
    variant?: 'default' | 'surface' | 'secondary' | 'tertiary';
}

export default function ThemedView({
    variant = 'default',
    style,
    ...props
}: ThemedViewProps) {
    const { theme } = useTheme();

    const backgroundColor = {
        default: theme.colors.background,
        surface: theme.colors.surface,
        secondary: theme.colors.backgroundSecondary,
        tertiary: theme.colors.backgroundTertiary,
    }[variant];

    return (
        <View
            style={[{ backgroundColor }, style]}
            {...props}
        />
    );
}
