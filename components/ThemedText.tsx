import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemedTextProps extends TextProps {
    variant?: 'default' | 'secondary' | 'tertiary' | 'inverse';
    type?: 'default' | 'title' | 'subtitle' | 'caption';
}

export default function ThemedText({
    variant = 'default',
    type = 'default',
    style,
    ...props
}: ThemedTextProps) {
    const { theme } = useTheme();

    const color = {
        default: theme.colors.text,
        secondary: theme.colors.textSecondary,
        tertiary: theme.colors.textTertiary,
        inverse: theme.colors.textInverse,
    }[variant];

    const typeStyle = {
        default: styles.default,
        title: styles.title,
        subtitle: styles.subtitle,
        caption: styles.caption,
    }[type];

    return (
        <Text
            style={[{ color }, typeStyle, style]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        fontWeight: '400',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    caption: {
        fontSize: 14,
        fontWeight: '500',
    },
});
