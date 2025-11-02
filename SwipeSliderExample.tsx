import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import SwipeSlider from './SwipeSlider';

/**
 * SwipeSlider Feature Showcase
 * 
 * Each example demonstrates ONE primary feature clearly.
 * This helps new users understand what each prop does individually.
 */
const SwipeSliderExample = () => {
    const [lastSwipe, setLastSwipe] = useState<string>('');

    const handleSwipeLeft = () => {
        setLastSwipe('Left');
        Alert.alert('Swipe Detected!', 'You swiped LEFT!', [{ text: 'OK' }]);
    };

    const handleSwipeRight = () => {
        setLastSwipe('Right');
        Alert.alert('Swipe Detected!', 'You swiped RIGHT!', [{ text: 'OK' }]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>SwipeSlider Feature Showcase</Text>
            <Text style={styles.subtitle}>
                Each example demonstrates ONE feature clearly
            </Text>
            
            {lastSwipe !== '' && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        Last Swipe: <Text style={styles.resultBold}>{lastSwipe}</Text>
                    </Text>
                </View>
            )}

            {/* Example 1: Default - No Customization */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>1. 📦 Default Slider</Text>
                <Text style={styles.exampleDescription}>
                    All default values - no customization
                </Text>
                <SwipeSlider
                    leftOption="Cancel"
                    rightOption="Confirm"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                />
            </View>

            {/* Example 2: Container Size */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>2. 📏 Custom Container Size</Text>
                <Text style={styles.exampleDescription}>
                    Large container (380x90) for better touch accessibility
                </Text>
                <SwipeSlider
                    leftOption="Back"
                    rightOption="Next"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerWidth={380}
                    containerHeight={90}
                />
            </View>

            {/* Example 3: Thumb Size */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>3. 🔘 Custom Thumb Size</Text>
                <Text style={styles.exampleDescription}>
                    Large thumb button (80px) for easier grip
                </Text>
                <SwipeSlider
                    leftOption="Decline"
                    rightOption="Accept"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    thumbSize={80}
                />
            </View>

            {/* Example 4: Container Colors & Borders */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>4. 🎨 Container Styling</Text>
                <Text style={styles.exampleDescription}>
                    Custom background, border color and border radius
                </Text>
                <SwipeSlider
                    leftOption="No"
                    rightOption="Yes"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerBackgroundColor="#FFF3E0"
                    containerBorderColor="#FF9800"
                    containerBorderWidth={0}
                    containerBorderRadius={10}
                />
            </View>

            {/* Example 5: Thumb Styling */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>5. 💎 Thumb Styling</Text>
                <Text style={styles.exampleDescription}>
                    Custom thumb colors, borders and border radius
                </Text>
                <SwipeSlider
                    leftOption="Left"
                    rightOption="Right"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    thumbBackgroundColor="#FFD700"
                    thumbBorderColor="#FF6B00"
                    thumbBorderWidth={4}
                    thumbBorderRadius={15}
                />
            </View>

            {/* Example 6: Active Background Colors */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>6. 🌈 Active Background Colors</Text>
                <Text style={styles.exampleDescription}>
                    Purple left, Teal right with gradient (default)
                </Text>
                <SwipeSlider
                    leftOption="Dislike"
                    rightOption="Like"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    activeBackgroundColorLeft="#9C27B0"
                    activeBackgroundColorRight="#00BCD4"
                />
            </View>

            {/* Example 7: Solid Background (No Gradient) */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>7. 🎯 Solid Background</Text>
                <Text style={styles.exampleDescription}>
                    No gradient - classic solid color fill (enableGradient=false)
                </Text>
                <SwipeSlider
                    leftOption="Delete"
                    rightOption="Archive"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    enableGradient={false}
                    activeBackgroundColorLeft="#E91E63"
                    activeBackgroundColorRight="#FFC107"
                />
            </View>

            {/* Example 8: Preview Gradient - Always */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>8. 🔍 Preview Gradient - Always</Text>
                <Text style={styles.exampleDescription}>
                    Three-color gradient always visible, fades on swipe
                </Text>
                <SwipeSlider
                    leftOption="Reject"
                    rightOption="Accept"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    previewGradientDisplay="always"
                    activeBackgroundColorLeft="#F44336"
                    activeBackgroundColorRight="#4CAF50"
                    centerBackgroundColor="#616161"
                />
            </View>

            {/* Example 9: Preview Gradient - On Thumb Press */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>9. 👆 Preview - On Thumb Press (Default)</Text>
                <Text style={styles.exampleDescription}>
                    Gradient appears when touching, fades on swipe
                </Text>
                <SwipeSlider
                    leftOption="Skip"
                    rightOption="Continue"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    previewGradientDisplay="onThumbPress"
                    activeBackgroundColorLeft="#FF5722"
                    activeBackgroundColorRight="#8BC34A"
                    centerBackgroundColor="#455A64"
                />
            </View>

            {/* Example 10: Preview Gradient - Off */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>10. 🚫 Preview Gradient - Off</Text>
                <Text style={styles.exampleDescription}>
                    No preview - colors only visible during swipe
                </Text>
                <SwipeSlider
                    leftOption="Cancel"
                    rightOption="OK"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    previewGradientDisplay="off"
                    activeBackgroundColorLeft="#D32F2F"
                    activeBackgroundColorRight="#1976D2"
                />
            </View>

            {/* Example 11: Custom Center Gradient Color */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>11. 🎭 Custom Center Color</Text>
                <Text style={styles.exampleDescription}>
                    Gradients blend through custom center color (purple)
                </Text>
                <SwipeSlider
                    leftOption="Previous"
                    rightOption="Next"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    activeBackgroundColorLeft="#FF4081"
                    activeBackgroundColorRight="#00E5FF"
                    centerBackgroundColor="#7C4DFF"
                />
            </View>

            {/* Example 12: Idle Animation Disabled */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>12. 🔇 No Idle Animation</Text>
                <Text style={styles.exampleDescription}>
                    Chevron animation disabled (enableIdleAnimation=false)
                </Text>
                <SwipeSlider
                    leftOption="Undo"
                    rightOption="Redo"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    enableIdleAnimation={false}
                />
            </View>

            {/* Example 13: Custom Idle Animation Speed */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>13. ⚡ Fast Idle Animation</Text>
                <Text style={styles.exampleDescription}>
                    Super fast chevron animation (600ms duration)
                </Text>
                <SwipeSlider
                    leftOption="Slow"
                    rightOption="Fast"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    idleAnimationDuration={600}
                />
            </View>

            {/* Example 14: Custom Chevron Colors */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>14. 🎨 Custom Chevron Colors</Text>
                <Text style={styles.exampleDescription}>
                    Orange chevrons left, Blue chevrons right
                </Text>
                <SwipeSlider
                    leftOption="Back"
                    rightOption="Forward"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    idleChevronColorLeft="#FF6D00"
                    idleChevronColorRight="#2962FF"
                />
            </View>

            {/* Example 15: Option Text Size */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>15. 📝 Large Option Text</Text>
                <Text style={styles.exampleDescription}>
                    Extra large text size (24px) for better visibility
                </Text>
                <SwipeSlider
                    leftOption="NO"
                    rightOption="YES"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    optionFontSize={24}
                />
            </View>

            {/* Example 16: Option Text Color */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>16. 🖌️ Custom Option Text Color</Text>
                <Text style={styles.exampleDescription}>
                    Dark blue text for both options
                </Text>
                <SwipeSlider
                    leftOption="Cancel"
                    rightOption="Submit"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    optionColor="#0D47A1"
                />
            </View>

            {/* Example 17: Different Text Colors Per Side */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>17. 🎨 Text Color Per Side</Text>
                <Text style={styles.exampleDescription}>
                    Red text left, Green text right (static colors)
                </Text>
                <SwipeSlider
                    leftOption="Delete"
                    rightOption="Save"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    leftOptionColor="#D32F2F"
                    rightOptionColor="#388E3C"
                    enableTextColorTransition={false}
                />
            </View>

            {/* Example 18: Text Color Transition */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>18. 🌊 Smooth Text Color Transition</Text>
                <Text style={styles.exampleDescription}>
                    Text colors morph from gray to red/green during swipe
                </Text>
                <SwipeSlider
                    leftOption="Decline"
                    rightOption="Accept"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    optionColor="#757575"
                    leftOptionColor="#C62828"
                    rightOptionColor="#2E7D32"
                    enableTextColorTransition={true}
                />
            </View>

            {/* Example 19: Auto Contrast Text */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>19. 🧪 Auto Contrast Text</Text>
                <Text style={styles.exampleDescription}>
                    Text colors auto-adjust based on background brightness
                </Text>
                <SwipeSlider
                    leftOption="Dark BG"
                    rightOption="Light BG"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    enableAutoContrastText={true}
                    activeBackgroundColorLeft="#212121"
                    activeBackgroundColorRight="#FFEB3B"
                    containerBackgroundColor="#424242"
                    enableGradient={false}
                    enableTextColorTransition={false}
                />
            </View>

            {/* Example 20: Inactive Option Opacity */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>20. 👻 Inactive Option Fade</Text>
                <Text style={styles.exampleDescription}>
                    Non-active option fades to 10% when swiping opposite side
                </Text>
                <SwipeSlider
                    leftOption="Option A"
                    rightOption="Option B"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    inactiveOptionOpacity={0.1}
                />
            </View>

            {/* Example 21: High Swipe Threshold */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>21. 🔒 High Swipe Threshold</Text>
                <Text style={styles.exampleDescription}>
                    Must swipe 90% to trigger - for critical actions
                </Text>
                <SwipeSlider
                    leftOption="⚠️ Delete"
                    rightOption="✓ Safe"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    swipeThreshold={0.9}
                    activeBackgroundColorLeft="#D32F2F"
                    activeBackgroundColorRight="#388E3C"
                />
            </View>

            {/* Example 22: Low Swipe Threshold */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>22. 🚀 Low Swipe Threshold</Text>
                <Text style={styles.exampleDescription}>
                    Only 25% swipe needed - very easy to trigger
                </Text>
                <SwipeSlider
                    leftOption="Quick"
                    rightOption="Easy"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    swipeThreshold={0.25}
                />
            </View>

            {/* Example 23: Fast Animation */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>23. ⚡ Fast Animation</Text>
                <Text style={styles.exampleDescription}>
                    Super fast 100ms animation duration
                </Text>
                <SwipeSlider
                    leftOption="Fast"
                    rightOption="Quick"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    animationDuration={100}
                />
            </View>

            {/* Example 24: Slow Animation */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>24. 🐌 Slow Animation</Text>
                <Text style={styles.exampleDescription}>
                    Slow and smooth 600ms animation duration
                </Text>
                <SwipeSlider
                    leftOption="Slow"
                    rightOption="Smooth"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    animationDuration={600}
                />
            </View>

            {/* Example 25: Container Padding */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>25. 📐 Custom Container Padding</Text>
                <Text style={styles.exampleDescription}>
                    Large padding (12px) - thumb stays well inside bounds
                </Text>
                <SwipeSlider
                    leftOption="Padded"
                    rightOption="Spaced"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerPadding={12}
                    containerBorderColor="#9E9E9E"
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
