import React from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
    Animated,
    Platform,
} from 'react-native';
import { Lock, Trophy, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { BlurView } from 'expo-blur';
import theme from '@/app/settings/theme';

interface LockedChallengeModalProps {
    visible: boolean;
    onClose: () => void;
    categoryTitle: string;
    requiredPoints: number;
    currentPoints: number;
    categoryColor: string;
}

export default function LockedChallengeModal({
    visible,
    onClose,
    categoryTitle,
    requiredPoints,
    currentPoints,
    categoryColor,
}: LockedChallengeModalProps) {
    const { theme } = useTheme();
    const pointsNeeded = requiredPoints - currentPoints;
    const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    // Create styles with theme
    const styles = React.useMemo(() => StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            padding: 20,
        },
        modalContainer: {
            backgroundColor: theme.colors.surface,
            borderRadius: 1,
            padding: 28,
            width: '100%',
            maxWidth: 380,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            //elevation: 10,
        },
        closeButton: {
            position: 'absolute' as const,
            top: 16,
            right: 16,
            zIndex: 10,
            padding: 4,
        },
        iconContainer: {
            width: 96,
            height: 96,
            borderRadius: 1,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
            alignSelf: 'center' as const,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            //elevation: 6,
        },
        title: {
            fontSize: 26,
            fontWeight: '800' as const,
            color: theme.colors.text,
            textAlign: 'center' as const,
            marginBottom: 12,
            fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        },
        categoryBadge: {
            backgroundColor: theme.colors.backgroundSecondary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 1,
            alignSelf: 'center' as const,
            marginBottom: 24,
        },
        categoryName: {
            fontSize: 15,
            fontWeight: '700' as const,
            color: theme.colors.textSecondary,
        },
        pointsContainer: {
            backgroundColor: theme.colors.surfaceSecondary,
            borderRadius: 1,
            padding: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        pointsRow: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            marginBottom: 12,
            gap: 8,
        },
        pointsLabel: {
            fontSize: 15,
            color: theme.colors.textSecondary,
            fontWeight: '600' as const,
            flex: 1,
        },
        pointsValue: {
            fontSize: 18,
            fontWeight: '800' as const,
            color: theme.colors.primary,
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.border,
            marginVertical: 12,
        },
        pointsNeededLabel: {
            fontSize: 15,
            color: theme.colors.text,
            fontWeight: '700' as const,
            flex: 1,
        },
        pointsNeededValue: {
            fontSize: 22,
            fontWeight: '900' as const,
            color: theme.colors.error,
        },
        message: {
            fontSize: 14,
            color: theme.colors.textSecondary,
            textAlign: 'center' as const,
            lineHeight: 20,
            marginBottom: 24,
        },
        button: {
            paddingVertical: 16,
            borderRadius: 1,
            alignItems: 'center' as const,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            //elevation: 4,
        },
        buttonPressed: {
            opacity: 0.8,
            transform: [{ scale: 0.98 }],
        },
        buttonText: {
            fontSize: 17,
            fontWeight: '700' as const,
            color: '#FFF',
        },
    }), [theme]);

    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scaleAnim.setValue(0.8);
            fadeAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        {/* Close button */}
                        <Pressable style={styles.closeButton} onPress={onClose}>
                            <X size={24} color="#64748B" />
                        </Pressable>

                        {/* Lock icon with gradient background */}
                        <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
                            <Lock size={48} color="#FFF" strokeWidth={2.5} />
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>Challenge Verrouillé</Text>

                        {/* Category name */}
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryName}>{categoryTitle}</Text>
                        </View>

                        {/* Points info */}
                        <View style={styles.pointsContainer}>
                            <View style={styles.pointsRow}>
                                <Trophy size={20} color="#8B9F99" />
                                <Text style={styles.pointsLabel}>Points requis :</Text>
                                <Text style={styles.pointsValue}>{requiredPoints}</Text>
                            </View>

                            <View style={styles.pointsRow}>
                                <Trophy size={20} color="#F59E0B" />
                                <Text style={styles.pointsLabel}>Vos points :</Text>
                                <Text style={[styles.pointsValue, { color: '#F59E0B' }]}>
                                    {currentPoints}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.pointsRow}>
                                <Text style={styles.pointsNeededLabel}>Points manquants :</Text>
                                <Text style={styles.pointsNeededValue}>{pointsNeeded}</Text>
                            </View>
                        </View>

                        {/* Message */}
                        <Text style={styles.message}>
                            Complétez d'autres quiz pour gagner des points et débloquer ce challenge !
                        </Text>

                        {/* Button */}
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: categoryColor },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Compris !</Text>
                        </Pressable>
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    );
}