import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types/theme';
import { Check, ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';

export default function ThemeSelectionScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, themeName, setTheme, availableThemes } = useTheme();

    const handleThemeSelect = async (selectedTheme: Theme) => {
        if (Platform.OS !== 'web') {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        setTheme(selectedTheme.id);
    };

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color={theme.colors.textInverse} />
                </Pressable>
                <Text style={[styles.headerTitle, { color: theme.colors.textInverse }]}>
                    Choisir un thème
                </Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Theme Grid */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
               
                <View style={styles.grid}>
                    {availableThemes.map((themeOption) => {
                        const isSelected = themeName === themeOption.id;

                        return (
                            <Pressable
                                key={themeOption.id}
                                onPress={() => handleThemeSelect(themeOption)}
                                style={({ pressed }) => [
                                    styles.themeCard,
                                    {
                                        borderColor: isSelected
                                            ? themeOption.colors.primary
                                            : theme.colors.border,
                                        borderWidth: isSelected ? 3 : 1,
                                    },
                                    pressed && styles.themeCardPressed,
                                ]}
                            >
                                {/* Color Preview */}
                                <View style={styles.colorPreview}>
                                    <View
                                        style={[
                                            styles.colorBlock,
                                            styles.colorBlockLarge,
                                            { backgroundColor: themeOption.colors.primary }
                                        ]}
                                    />
                                    <View style={styles.colorRow}>
                                        <View
                                            style={[
                                                styles.colorBlock,
                                                styles.colorBlockSmall,
                                                { backgroundColor: themeOption.colors.secondary }
                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.colorBlock,
                                                styles.colorBlockSmall,
                                                { backgroundColor: themeOption.colors.accent }
                                            ]}
                                        />
                                    </View>
                                </View>

                                {/* Theme Info */}
                                <View style={styles.themeInfo}>
                                    <Text style={[styles.themeName, { color: theme.colors.text }]}>
                                        {themeOption.name}
                                    </Text>
                                    <Text style={[styles.themeType, { color: theme.colors.textSecondary }]}>
                                        {themeOption.isDark ? 'Sombre' : 'Clair'}
                                    </Text>
                                </View>

                                {/* Selected Indicator */}
                                {isSelected && (
                                    <View
                                        style={[
                                            styles.selectedBadge,
                                            { backgroundColor: themeOption.colors.primary }
                                        ]}
                                    >
                                        <Check size={20} color="#FFF" strokeWidth={3} />
                                    </View>
                                )}
                            </Pressable>
                        );
                    })}
                </View>

               
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
    },
    scrollContent: {
        padding: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 32,
    },
    themeCard: {
        width: '47%',
        borderRadius: 1,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        //elevation: 4,
    },
    themeCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    colorPreview: {
        height: 120,
    },
    colorBlock: {
        flex: 1,
    },
    colorBlockLarge: {
        height: 80,
    },
    colorRow: {
        flexDirection: 'row',
        height: 40,
    },
    colorBlockSmall: {
        flex: 1,
    },
    themeInfo: {
        padding: 12,
    },
    themeName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    themeType: {
        fontSize: 13,
        fontWeight: '500',
    },
    selectedBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    previewSection: {
        marginTop: 16,
    },
    previewTitle: {
        marginBottom: 16,
    },
    previewHeader: {
        padding: 16,
    },
    previewHeaderText: {
        fontSize: 18,
        fontWeight: '700',
    },
    previewContent: {
        padding: 16,
    },
    previewText: {
        marginTop: 8,
        lineHeight: 20,
    },
    previewButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    previewButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 1,
        alignItems: 'center',
    },
    previewButtonOutline: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 1,
        alignItems: 'center',
        borderWidth: 2,
    },
    previewButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
});
