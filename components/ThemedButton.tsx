import React from 'react';
import { Pressable, PressableProps, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedButtonProps extends PressableProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    fullWidth?: boolean;
}

export default function ThemedButton({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    fullWidth = false,
    style,
    disabled,
    ...props
}: ThemedButtonProps) {
    const { theme } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return theme.colors.border;
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'secondary': return theme.colors.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.textTertiary;
        switch (variant) {
            case 'primary': return theme.colors.textInverse;
            case 'secondary': return theme.colors.textInverse;
            case 'outline': return theme.colors.primary;
            case 'ghost': return theme.colors.primary;
            default: return theme.colors.textInverse;
        }
    };

    const sizeStyles = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
    }[size];

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                sizeStyles,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
                },
                variant === 'outline' && styles.outline,
                fullWidth && styles.fullWidth,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
                style,
            ] as any}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    outline: {
        borderWidth: 2,
        shadowOpacity: 0,
        elevation: 0,
    },
    fullWidth: {
        width: '100%',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
    },
});
