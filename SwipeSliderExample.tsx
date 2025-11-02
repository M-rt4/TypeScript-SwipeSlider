import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import SwipeSlider from './SwipeSlider';

/**
 * SwipeSlider Kullanım Örnekleri
 * 
 * Bu dosya, SwipeSlider komponentinin farklı kullanım senaryolarını gösterir.
 */
const SwipeSliderExample = () => {
    const [lastSwipe, setLastSwipe] = useState<string>('');

    const handleSwipeLeft = () => {
        setLastSwipe('Sol');
        Alert.alert(
            'Kaydırma Algılandı!',
            'Sol tarafa kaydırdınız!',
            [{ text: 'Tamam' }]
        );
    };

    const handleSwipeRight = () => {
        setLastSwipe('Sağ');
        Alert.alert(
            'Kaydırma Algılandı!',
            'Sağ tarafa kaydırdınız!',
            [{ text: 'Tamam' }]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>SwipeSlider Örnekleri</Text>
            
            {lastSwipe !== '' && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        Son Kaydırma: <Text style={styles.resultBold}>{lastSwipe}</Text>
                    </Text>
                </View>
            )}

            {/* Örnek 1: Temel Kullanım */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>1. Temel Kullanım</Text>
                <SwipeSlider
                    leftOption="Hayır"
                    rightOption="Evet"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                />
            </View>

            {/* Örnek 2: Farklı Renkler (Sol: Kırmızı, Sağ: Yeşil) */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>2. Farklı Aktif Renkler</Text>
                <SwipeSlider
                    leftOption="Red"
                    rightOption="Kabul"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerBackgroundColor="#F5F5F5"
                    activeBackgroundColorLeft="#FF4444"
                    activeBackgroundColorRight="#4CAF50"
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderColor="#999999"
                    optionColor="#333333"
                />
            </View>

            {/* Örnek 3: Mor/Pembe Tema */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>3. Mor/Pembe Tema</Text>
                <SwipeSlider
                    leftOption="❌"
                    rightOption="✓"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerBackgroundColor="#E8D5F2"
                    activeBackgroundColorLeft="#E91E63"
                    activeBackgroundColorRight="#9C27B0"
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderColor="#9C27B0"
                    optionColor="#6A1B9A"
                    optionFontSize={24}
                />
            </View>

            {/* Örnek 4: Büyük Boyutlu */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>4. Büyük Boyutlu Slider</Text>
                <SwipeSlider
                    leftOption="◀ Sol"
                    rightOption="Sağ ▶"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerHeight={80}
                    thumbSize={70}
                    thumbBorderRadius={35}
                    containerBorderRadius={40}
                    optionFontSize={20}
                    containerBackgroundColor="#E3F2FD"
                    activeBackgroundColorLeft="#FF5722"
                    activeBackgroundColorRight="#2196F3"
                    thumbBackgroundColor="#FFFFFF"
                    thumbBorderColor="#1976D2"
                    optionColor="#0D47A1"
                />
            </View>

            {/* Örnek 5: Like/Dislike Tasarımı */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>5. Like/Dislike Tasarımı</Text>
                <SwipeSlider
                    leftOption="👎"
                    rightOption="👍"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerBackgroundColor="#FFFFFF"
                    containerBorderWidth={3}
                    containerBorderColor="#FFB300"
                    activeBackgroundColorLeft="#F44336"
                    activeBackgroundColorRight="#4CAF50"
                    thumbBackgroundColor="#FFF176"
                    thumbBorderColor="#F57F17"
                    thumbBorderWidth={3}
                    optionFontSize={28}
                />
            </View>

            {/* Örnek 6: Küçük Kompakt */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>6. Küçük Kompakt Slider</Text>
                <SwipeSlider
                    leftOption="❌"
                    rightOption="✓"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    containerHeight={45}
                    containerWidth={200}
                    thumbSize={35}
                    thumbBorderRadius={17.5}
                    containerBorderRadius={22.5}
                    optionFontSize={18}
                    containerBackgroundColor="#F5F5F5"
                    activeBackgroundColorLeft="#FF5252"
                    activeBackgroundColorRight="#69F0AE"
                    thumbBackgroundColor="#FFFFFF"
                />
            </View>

            {/* Örnek 7: Kolay Kaydırma (Düşük Threshold) */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>7. Kolay Kaydırma (Düşük Threshold)</Text>
                <Text style={styles.exampleDescription}>
                    Daha az kaydırma gerektirir (%30)
                </Text>
                <SwipeSlider
                    leftOption="Silme"
                    rightOption="Arşiv"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    swipeThreshold={0.3}
                    containerBackgroundColor="#EEEEEE"
                    activeBackgroundColorLeft="#E53935"
                    activeBackgroundColorRight="#FF9800"
                    optionColor="#E65100"
                />
            </View>

            {/* Örnek 8: Zor Kaydırma */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>8. Zor Kaydırma (Yüksek Threshold)</Text>
                <Text style={styles.exampleDescription}>
                    Daha fazla kaydırma gerektirir (%70)
                </Text>
                <SwipeSlider
                    leftOption="İptal"
                    rightOption="Onayla"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    swipeThreshold={0.7}
                    containerBackgroundColor="#FFEBEE"
                    activeBackgroundColorLeft="#D32F2F"
                    activeBackgroundColorRight="#388E3C"
                    optionColor="#B71C1C"
                />
            </View>

            {/* Örnek 9: Devre Dışı */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>9. Devre Dışı Slider</Text>
                <SwipeSlider
                    leftOption="Sol"
                    rightOption="Sağ"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    disabled={true}
                    containerBackgroundColor="#BDBDBD"
                    activeBackgroundColorLeft="#757575"
                    activeBackgroundColorRight="#757575"
                    thumbBackgroundColor="#9E9E9E"
                    optionColor="#616161"
                />
            </View>

            {/* Örnek 10: Hızlı Animasyon */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>10. Hızlı Animasyon</Text>
                <SwipeSlider
                    leftOption="⚡ Hızlı"
                    rightOption="Hızlı ⚡"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    animationDuration={150}
                    containerBackgroundColor="#FFF9C4"
                    activeBackgroundColorLeft="#FF9800"
                    activeBackgroundColorRight="#FFEB3B"
                    optionColor="#F57F17"
                />
            </View>

            {/* Örnek 11: Idle Animasyon Devre Dışı */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>11. Idle Animasyon Kapalı</Text>
                <Text style={styles.exampleDescription}>
                    Boşta bekleme animasyonu kapalı
                </Text>
                <SwipeSlider
                    leftOption="Statik"
                    rightOption="Slider"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    enableIdleAnimation={false}
                    containerBackgroundColor="#E0E0E0"
                    activeBackgroundColorLeft="#757575"
                    activeBackgroundColorRight="#9E9E9E"
                />
            </View>

            {/* Örnek 12: Özel Idle Animasyon */}
            <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>12. Özel Idle Animasyon</Text>
                <Text style={styles.exampleDescription}>
                    Daha hızlı chevron animasyonu
                </Text>
                <SwipeSlider
                    leftOption="← Kaydır"
                    rightOption="Kaydır →"
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    enableIdleAnimation={true}
                    idleAnimationDuration={800}
                    idleChevronColor="#5C6BC0"
                    containerBackgroundColor="#E8EAF6"
                    activeBackgroundColorLeft="#5C6BC0"
                    activeBackgroundColorRight="#7E57C2"
                    optionColor="#311B92"
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
        marginBottom: 20,
        color: '#333',
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

