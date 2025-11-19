import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedCardProps extends ViewProps {
    elevated?: boolean;
    variant?: 'default' | 'secondary';
}

export default function ThemedCard({
    elevated = true,
    variant = 'default',
    style,
    children,
    ...props
}: ThemedCardProps) {
    const { theme } = useTheme();

    const backgroundColor = variant === 'default'
        ? theme.colors.surface
        : theme.colors.surfaceSecondary;

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor,
                    borderColor: theme.colors.border,
                },
                elevated && styles.elevated,
                style
            ]}
            {...props}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
});
