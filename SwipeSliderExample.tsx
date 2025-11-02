import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import SwipeSlider from './SwipeSlider';

/**
 * SwipeSlider Usage Examples
 * 
 * This file demonstrates 11 different use cases showcasing all features of the SwipeSlider component.
 * Each example highlights different prop combinations and design styles.
 * 
 * Features demonstrated:
 * - Gradient backgrounds (default) and solid backgrounds (enableGradient={false})
 * - Dynamic option opacity
 * - Custom chevron colors
 * - Various sizes and themes
 * - Different animation speeds
 * - Threshold variations
 */
const SwipeSliderExample = () => {
    const [lastSwipe, setLastSwipe] = useState<string>('');

    const handleSwipeLeft = () => {
        setLastSwipe('Left');
        Alert.alert(
            'Swipe Detected!',
            'You swiped left!',
            [{ text: 'OK' }]
        );
    };

    const handleSwipeRight = () => {
        setLastSwipe('Right');
        Alert.alert(
            'Swipe Detected!',
            'You swiped right!',
            [{ text: 'OK' }]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>SwipeSlider Examples</Text>
            <Text style={styles.subtitle}>
                11 Different Styles Showcasing All Features
            </Text>
            
            {lastSwipe !== '' && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        Last Swipe: <Text style={styles.resultBold}>{lastSwipe}</Text>
                    </Text>
                </View>
            )}

            {/* Örnek 1: E-Commerce - Favorilere Ekle / Sepete Ekle */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>1. 🛒 E-Commerce Slider</Text>
                <Text style={styles.exampleDescription}>
                    Favorite/Cart - Complete feature set showcase
                </Text>
                <SwipeSlider
                    leftOption="❤️ Favori"
                    rightOption="🛒 Sepet"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={320}
                    containerHeight={70}
                    containerBackgroundColor="#FFF5F5"
                    containerBorderRadius={35}
                    containerBorderWidth={2}
                    containerBorderColor="#FFE0E0"
                    containerPadding={6}
                    thumbSize={40}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={30}
                    thumbBorderWidth={3}
                    thumbBorderColor="#FF6B6B"
                    activeBackgroundColorLeft="#FF6B6B"
                    activeBackgroundColorRight="#4CAF50"
                    optionFontSize={18}
                    optionColor="#333333"
                    swipeThreshold={0.4}
                    animationDuration={250}
                    enableIdleAnimation={true}
                    idleAnimationDuration={1000}
                    inactiveOptionOpacity={0.25}
                />
            </View>

            {/* Örnek 2: Social Media - Like/Dislike */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>2. 📱 Social Media Reactions</Text>
                <Text style={styles.exampleDescription}>
                    Quick reactions with emoji options
                </Text>
                <SwipeSlider
                    leftOption="👎"
                    rightOption="👍"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={280}
                    containerHeight={65}
                    containerBackgroundColor="#F8F9FA"
                    containerBorderRadius={32.5}
                    containerPadding={6}
                    thumbSize={55}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={27.5}
                    thumbBorderWidth={2}
                    thumbBorderColor="#E0E0E0"
                    activeBackgroundColorLeft="#EF5350"
                    activeBackgroundColorRight="#66BB6A"
                    optionFontSize={32}
                    swipeThreshold={0.35}
                    animationDuration={200}
                    idleAnimationDuration={1200}
                />
            </View>

            {/* Örnek 3: Critical Action - Delete with High Security */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>3. ⚠️ Critical Action Slider</Text>
                <Text style={styles.exampleDescription}>
                    High threshold (70%) for destructive actions
                </Text>
                <SwipeSlider
                    leftOption="🗑️ SİL"
                    rightOption="✓ KORU"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={300}
                    containerHeight={75}
                    containerBackgroundColor="#FFEBEE"
                    containerBorderRadius={37.5}
                    containerBorderWidth={3}
                    containerBorderColor="#FFCDD2"
                    containerPadding={7}
                    thumbSize={65}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={32.5}
                    thumbBorderWidth={3}
                    thumbBorderColor="#D32F2F"
                    activeBackgroundColorLeft="#D32F2F"
                    activeBackgroundColorRight="#388E3C"
                    optionFontSize={16}
                    optionColor="#B71C1C"
                    swipeThreshold={0.7}
                    animationDuration={350}
                    idleAnimationDuration={1500}
                    inactiveOptionOpacity={0.15}
                />
            </View>

            {/* Örnek 4: Modern Minimalist Design */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>4. 🎨 Modern Minimalist</Text>
                <Text style={styles.exampleDescription}>
                    Clean design with subtle colors
                </Text>
                <SwipeSlider
                    leftOption="Decline"
                    rightOption="Accept"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={340}
                    containerHeight={60}
                    containerBackgroundColor="#FAFAFA"
                    containerBorderRadius={30}
                    containerPadding={5}
                    thumbSize={50}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={25}
                    thumbBorderWidth={1}
                    thumbBorderColor="#E0E0E0"
                    activeBackgroundColorLeft="#757575"
                    activeBackgroundColorRight="#000000"
                    optionFontSize={15}
                    optionColor="#424242"
                    swipeThreshold={0.4}
                    animationDuration={300}
                    idleAnimationDuration={1100}
                    inactiveOptionOpacity={0.4}
                />
            </View>

            {/* Örnek 4B: Solid Background (No Gradient) */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>4B. 🎯 Solid Background Style</Text>
                <Text style={styles.exampleDescription}>
                    No gradient - classic solid color fill
                </Text>
                <SwipeSlider
                    leftOption="❌ Decline"
                    rightOption="✓ Accept"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={310}
                    containerHeight={65}
                    containerBackgroundColor="#F5F5F5"
                    containerBorderRadius={32.5}
                    containerPadding={5}
                    thumbSize={55}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={27.5}
                    thumbBorderWidth={2}
                    thumbBorderColor="#BDBDBD"
                    activeBackgroundColorLeft="#FF5722"
                    activeBackgroundColorRight="#4CAF50"
                    enableGradient={false}
                    optionFontSize={16}
                    optionColor="#424242"
                    swipeThreshold={0.4}
                    animationDuration={250}
                    idleAnimationDuration={1000}
                    inactiveOptionOpacity={0.2}
                />
            </View>

            {/* Örnek 5: Dark Theme Premium */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>5. 🌙 Dark Theme Premium</Text>
                <Text style={styles.exampleDescription}>
                    Elegant dark mode with gold accents
                </Text>
                <SwipeSlider
                    leftOption="← Skip"
                    rightOption="Next →"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={300}
                    containerHeight={70}
                    containerBackgroundColor="#1E1E1E"
                    containerBorderRadius={35}
                    containerBorderWidth={2}
                    containerBorderColor="#FFD700"
                    containerPadding={6}
                    thumbSize={60}
                    thumbBackgroundColor="#2C2C2C"
                    thumbBorderRadius={30}
                    thumbBorderWidth={2}
                    thumbBorderColor="#FFD700"
                    activeBackgroundColorLeft="#D32F2F"
                    activeBackgroundColorRight="#FFD700"
                    optionFontSize={16}
                    optionColor="#FFD700"
                    swipeThreshold={0.45}
                    animationDuration={280}
                    idleAnimationDuration={900}
                />
            </View>

            {/* Örnek 6: Gradient-Style with Vibrant Colors */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>6. 🌈 Vibrant Gradient Style</Text>
                <Text style={styles.exampleDescription}>
                    Colorful design with thick borders
                </Text>
                <SwipeSlider
                    leftOption="NOPE"
                    rightOption="YASS"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={290}
                    containerHeight={68}
                    containerBackgroundColor="#FFFFFF"
                    containerBorderRadius={34}
                    containerBorderWidth={4}
                    containerBorderColor="#FF6B6B"
                    containerPadding={6}
                    thumbSize={58}
                    thumbBackgroundColor="#FFE66D"
                    thumbBorderRadius={29}
                    thumbBorderWidth={4}
                    thumbBorderColor="#FF6B6B"
                    activeBackgroundColorLeft="#FF6B6B"
                    activeBackgroundColorRight="#4ECDC4"
                    optionFontSize={18}
                    optionColor="#2C3E50"
                    swipeThreshold={0.38}
                    animationDuration={220}
                    idleAnimationDuration={1000}
                />
            </View>

            {/* Örnek 7: Compact Mobile-Optimized */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>7. 📱 Compact Mobile Slider</Text>
                <Text style={styles.exampleDescription}>
                    Small size, perfect for mobile lists
                </Text>
                <SwipeSlider
                    leftOption="✗"
                    rightOption="✓"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={180}
                    containerHeight={45}
                    containerBackgroundColor="#F0F0F0"
                    containerBorderRadius={22.5}
                    containerPadding={3}
                    thumbSize={38}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={19}
                    thumbBorderWidth={2}
                    thumbBorderColor="#CCCCCC"
                    activeBackgroundColorLeft="#FF5252"
                    activeBackgroundColorRight="#69F0AE"
                    optionFontSize={20}
                    optionColor="#333333"
                    swipeThreshold={0.35}
                    animationDuration={200}
                    idleAnimationDuration={800}
                />
            </View>

            {/* Örnek 8: Large Touch-Friendly Slider */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>8. 👆 Large Touch-Friendly</Text>
                <Text style={styles.exampleDescription}>
                    Extra large for accessibility & ease of use
                </Text>
                <SwipeSlider
                    leftOption="◀ BACK"
                    rightOption="NEXT ▶"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={350}
                    containerHeight={90}
                    containerBackgroundColor="#E3F2FD"
                    containerBorderRadius={45}
                    containerBorderWidth={3}
                    containerBorderColor="#90CAF9"
                    containerPadding={8}
                    thumbSize={80}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={40}
                    thumbBorderWidth={4}
                    thumbBorderColor="#1976D2"
                    activeBackgroundColorLeft="#FF5722"
                    activeBackgroundColorRight="#2196F3"
                    optionFontSize={20}
                    optionColor="#0D47A1"
                    swipeThreshold={0.4}
                    animationDuration={300}
                    idleAnimationDuration={1300}
                />
            </View>

            {/* Örnek 9: Fast Animation Slider */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>9. ⚡ Lightning Fast Animation</Text>
                <Text style={styles.exampleDescription}>
                    Ultra-fast 100ms animation with low threshold
                </Text>
                <SwipeSlider
                    leftOption="⚡ Quick"
                    rightOption="Fast ⚡"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={270}
                    containerHeight={62}
                    containerBackgroundColor="#FFF9C4"
                    containerBorderRadius={31}
                    containerPadding={5}
                    thumbSize={52}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={26}
                    thumbBorderWidth={2}
                    thumbBorderColor="#FBC02D"
                    activeBackgroundColorLeft="#FF9800"
                    activeBackgroundColorRight="#FFEB3B"
                    optionFontSize={16}
                    optionColor="#F57F17"
                    swipeThreshold={0.3}
                    animationDuration={100}
                    idleAnimationDuration={600}
                />
            </View>

            {/* Örnek 10: Gradient Center Color Showcase */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>10. 🎭 Custom Center Gradient</Text>
                <Text style={styles.exampleDescription}>
                    Gradients fade to custom center color + custom chevrons
                </Text>
                <SwipeSlider
                    leftOption="← Swipe Me"
                    rightOption="Swipe Me →"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={330}
                    containerHeight={72}
                    containerBackgroundColor="#EDE7F6"
                    containerBorderRadius={36}
                    containerBorderWidth={2}
                    containerBorderColor="#CE93D8"
                    containerPadding={7}
                    thumbSize={62}
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderRadius={31}
                    thumbBorderWidth={3}
                    thumbBorderColor="#9C27B0"
                    activeBackgroundColorLeft="#FF4081"
                    activeBackgroundColorRight="#00BCD4"
                    centerBackgroundColor="#F3E5F5"
                    optionFontSize={15}
                    optionColor="#4A148C"
                    swipeThreshold={0.42}
                    animationDuration={320}
                    enableIdleAnimation={true}
                    idleAnimationDuration={1800}
                    idleChevronColorLeft="#FF4081"
                    idleChevronColorRight="#00BCD4"
                    inactiveOptionOpacity={0.2}
                />
            </View>

            <View style={styles.spacer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    resultBox: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    resultText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    resultBold: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    exampleContainer: {
        width: '100%',
        marginBottom: 30,
        alignItems: 'center',
    },
    exampleTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
        alignSelf: 'flex-start',
    },
    exampleDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    spacer: {
        height: 40,
    },
});

export default SwipeSliderExample;

