import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Animated LinearGradient oluştur
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface SwipeSliderProps {
    // Sol ve sağ seçenek metinleri
    leftOption: string;
    rightOption: string;
    
    // Callback fonksiyonları - kullanıcı kaydırdığında tetiklenir
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    
    // Slider'ın kaydırılabilir olup olmadığı
    disabled?: boolean;
    
    // Container style
    containerStyle?: StyleProp<ViewStyle>;
    containerWidth?: number;
    containerHeight?: number;
    containerBackgroundColor?: string;
    containerBorderRadius?: number;
    containerBorderWidth?: number;
    containerBorderColor?: string;
    containerPadding?: number;
    
    // Buton (thumb) style
    thumbSize?: number;
    thumbBackgroundColor?: string;
    thumbBorderRadius?: number;
    thumbBorderWidth?: number;
    thumbBorderColor?: string;
    thumbStyle?: StyleProp<ViewStyle>;
    
    // Seçenek metni style
    optionTextStyle?: StyleProp<TextStyle>;
    leftOptionTextStyle?: StyleProp<TextStyle>;
    rightOptionTextStyle?: StyleProp<TextStyle>;
    optionFontSize?: number;
    optionColor?: string;
    inactiveOptionOpacity?: number;
    
    // Kaydırma hassasiyeti (0-1 arası, 0.5 = %50 kaydırma gerekir)
    swipeThreshold?: number;
    
    // Animasyon süresi (ms)
    animationDuration?: number;
    
    // Kaydırılan tarafın arka plan renkleri
    activeBackgroundColorLeft?: string;
    activeBackgroundColorRight?: string;
    centerBackgroundColor?: string;
    enableGradient?: boolean;
    
    // Idle (boşta) animasyon ayarları
    enableIdleAnimation?: boolean;
    idleAnimationDuration?: number;
    idleChevronColorLeft?: string;
    idleChevronColorRight?: string;
}

const SwipeSlider: React.FC<SwipeSliderProps> = ({
    leftOption,
    rightOption,
    onSwipeLeft,
    onSwipeRight,
    disabled = false,
    containerStyle,
    containerWidth = SCREEN_WIDTH * 0.85,
    containerHeight = 60,
    containerBackgroundColor = '#E0E0E0',
    containerBorderRadius = 30,
    containerBorderWidth = 0,
    containerBorderColor = 'transparent',
    containerPadding = 5,
    thumbSize = 50,
    thumbBackgroundColor = '#FFFFFF',
    thumbBorderRadius = 25,
    thumbBorderWidth = 2,
    thumbBorderColor = '#CCCCCC',
    thumbStyle,
    optionTextStyle,
    leftOptionTextStyle,
    rightOptionTextStyle,
    optionFontSize = 16,
    optionColor = '#333333',
    inactiveOptionOpacity = 0.3,
    swipeThreshold = 0.4,
    animationDuration = 300,
    activeBackgroundColorLeft = '#FF4444',
    activeBackgroundColorRight = '#4CAF50',
    centerBackgroundColor,
    enableGradient = true,
    enableIdleAnimation = true,
    idleAnimationDuration = 1200,
    idleChevronColorLeft,
    idleChevronColorRight,
}) => {
    // Merkez rengi - varsayılan olarak container background'u kullan
    const gradientCenterColor = centerBackgroundColor || containerBackgroundColor;
    
    // Chevron renkleri - varsayılan olarak active background renklerini kullan
    const leftChevronColor = idleChevronColorLeft || activeBackgroundColorLeft;
    const rightChevronColor = idleChevronColorRight || activeBackgroundColorRight;
    const pan = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTouching, setIsTouching] = useState(false);
    
    // Chevron opacity animasyonları
    const chevronOpacity1 = useRef(new Animated.Value(0.3)).current;
    const chevronOpacity2 = useRef(new Animated.Value(0.3)).current;
    const chevronOpacity3 = useRef(new Animated.Value(0.3)).current;
    const chevronContainerOpacity = useRef(new Animated.Value(1)).current;
    const optionsOpacity = useRef(new Animated.Value(0)).current;
    
    // Thumb'ın hareket hesaplamaları
    // Thumb merkez pozisyonu (container'ın sol kenarından thumb'ın sol kenarına olan mesafe)
    const thumbCenterPosition = (containerWidth - thumbSize) / 2;
    
    // Kaydırılabilir maksimum mesafe (merkezden her iki kenara)
    // Sol en uç: thumbCenterPosition - maxSlide = containerPadding
    // Sağ en uç: thumbCenterPosition + maxSlide = containerWidth - thumbSize - containerPadding
    const maxSlide = thumbCenterPosition - containerPadding;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled && !isAnimating,
            onMoveShouldSetPanResponder: () => !disabled && !isAnimating,
            onPanResponderGrant: () => {
                // Chevronları gizle, seçenekleri göster
                setIsTouching(true);
                Animated.parallel([
                    Animated.timing(chevronContainerOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(optionsOpacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
                pan.stopAnimation();
            },
            onPanResponderMove: (_, gesture) => {
                // Sınırlar içinde kalmasını sağla
                const newValue = Math.max(-maxSlide, Math.min(maxSlide, gesture.dx));
                pan.setValue(newValue);
            },
            onPanResponderRelease: (_, gesture) => {
                const threshold = maxSlide * swipeThreshold;
                
                setIsTouching(false);
                
                // Chevronları tekrar göster, seçenekleri gizle
                Animated.parallel([
                    Animated.timing(chevronContainerOpacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(optionsOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
                
                // Sağa kaydırma
                if (gesture.dx > threshold) {
                    setIsAnimating(true);
                    Animated.timing(pan, {
                        toValue: maxSlide,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }).start(() => {
                        onSwipeRight?.();
                        // Ortaya geri dön
                        setTimeout(() => {
                            Animated.timing(pan, {
                                toValue: 0,
                                duration: animationDuration,
                                useNativeDriver: true,
                            }).start(() => {
                                setIsAnimating(false);
                            });
                        }, 200);
                    });
                }
                // Sola kaydırma
                else if (gesture.dx < -threshold) {
                    setIsAnimating(true);
                    Animated.timing(pan, {
                        toValue: -maxSlide,
                        duration: animationDuration,
                        useNativeDriver: true,
                    }).start(() => {
                        onSwipeLeft?.();
                        // Ortaya geri dön
                        setTimeout(() => {
                            Animated.timing(pan, {
                                toValue: 0,
                                duration: animationDuration,
                                useNativeDriver: true,
                            }).start(() => {
                                setIsAnimating(false);
                            });
                        }, 200);
                    });
                }
                // Yeterince kaydırılmadıysa ortaya geri dön
                else {
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 7,
                    }).start();
                }
            },
        })
    ).current;

    // Idle animasyonu - Chevronların opacity animasyonu (senkronize dalga efekti)
    useEffect(() => {
        if (!enableIdleAnimation || disabled || isTouching || isAnimating) {
            return;
        }

        const fadeDuration = idleAnimationDuration / 3; // Her chevron için fade süresi
        
        // Tek bir senkronize döngü - her tekrarda aynı sıra
        const animation = Animated.loop(
            Animated.sequence([
                // ===== Chevron 1 Animasyonu =====
                Animated.timing(chevronOpacity1, {
                    toValue: 1,
                    duration: fadeDuration,
                    useNativeDriver: true,
                }),
                // Chevron 1 MAX'a ulaştı - Chevron 2 başlıyor (paralel)
                Animated.parallel([
                    // Chevron 1 fade out
                    Animated.timing(chevronOpacity1, {
                        toValue: 0.3,
                        duration: fadeDuration,
                        useNativeDriver: true,
                    }),
                    // Chevron 2 fade in
                    Animated.timing(chevronOpacity2, {
                        toValue: 1,
                        duration: fadeDuration,
                        useNativeDriver: true,
                    }),
                ]),
                // Chevron 2 MAX'a ulaştı - Chevron 3 başlıyor (paralel)
                Animated.parallel([
                    // Chevron 2 fade out
                    Animated.timing(chevronOpacity2, {
                        toValue: 0.3,
                        duration: fadeDuration,
                        useNativeDriver: true,
                    }),
                    // Chevron 3 fade in
                    Animated.timing(chevronOpacity3, {
                        toValue: 1,
                        duration: fadeDuration,
                        useNativeDriver: true,
                    }),
                ]),
                // Chevron 3 fade out (son)
                Animated.timing(chevronOpacity3, {
                    toValue: 0.3,
                    duration: fadeDuration,
                    useNativeDriver: true,
                }),
                // Kısa bekleme sonra tekrar başla
                Animated.delay(fadeDuration / 2),
            ])
        );

        animation.start();

        return () => {
            animation.stop();
        };
    }, [enableIdleAnimation, disabled, isTouching, isAnimating, idleAnimationDuration, chevronOpacity1, chevronOpacity2, chevronOpacity3]);

    // Arka plan rengini interpolate et
    const leftBackgroundOpacity = pan.interpolate({
        inputRange: [-maxSlide, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const rightBackgroundOpacity = pan.interpolate({
        inputRange: [0, maxSlide],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // Chevronları sadece buton merkezdeyken göster
    const chevronVisibility = pan.interpolate({
        inputRange: [-10, -5, 0, 5, 10],
        outputRange: [0, 0.5, 1, 0.5, 0],
        extrapolate: 'clamp',
    });

    // Sol seçenek opacity - sağa kaydırıldığında düşer
    const leftOptionOpacityValue = pan.interpolate({
        inputRange: [0, maxSlide],
        outputRange: [1, inactiveOptionOpacity],
        extrapolate: 'clamp',
    });

    // Sağ seçenek opacity - sola kaydırıldığında düşer
    const rightOptionOpacityValue = pan.interpolate({
        inputRange: [-maxSlide, 0],
        outputRange: [inactiveOptionOpacity, 1],
        extrapolate: 'clamp',
    });

    return (
        <View
            style={[
                styles.container,
                {
                    width: containerWidth,
                    height: containerHeight,
                    backgroundColor: containerBackgroundColor,
                    borderRadius: containerBorderRadius,
                    borderWidth: containerBorderWidth,
                    borderColor: containerBorderColor,
                    paddingHorizontal: containerPadding,
                },
                containerStyle,
            ]}
        >
            {/* Sol taraf aktif arka plan */}
            {enableGradient ? (
                <AnimatedLinearGradient
                    colors={[activeBackgroundColorLeft, gradientCenterColor]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.activeBackground,
                        {
                            opacity: leftBackgroundOpacity,
                            borderRadius: containerBorderRadius,
                        },
                    ]}
                />
            ) : (
                <Animated.View
                    style={[
                        styles.activeBackground,
                        {
                            opacity: leftBackgroundOpacity,
                            backgroundColor: activeBackgroundColorLeft,
                            borderRadius: containerBorderRadius,
                        },
                    ]}
                />
            )}
            
            {/* Sağ taraf aktif arka plan */}
            {enableGradient ? (
                <AnimatedLinearGradient
                    colors={[gradientCenterColor, activeBackgroundColorRight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.activeBackground,
                        {
                            opacity: rightBackgroundOpacity,
                            borderRadius: containerBorderRadius,
                        },
                    ]}
                />
            ) : (
                <Animated.View
                    style={[
                        styles.activeBackground,
                        {
                            opacity: rightBackgroundOpacity,
                            backgroundColor: activeBackgroundColorRight,
                            borderRadius: containerBorderRadius,
                        },
                    ]}
                />
            )}

            {/* Chevron Animasyonları - Sol Taraf */}
            {enableIdleAnimation && (
                <Animated.View 
                    style={[
                        styles.chevronContainer, 
                        styles.chevronLeft,
                        { 
                            opacity: Animated.multiply(chevronContainerOpacity, chevronVisibility)
                        }
                    ]}
                    pointerEvents="none"
                >
                    <Animated.View style={{ opacity: chevronOpacity3 }}>
                        <Entypo name="chevron-left" size={24} color={leftChevronColor} />
                    </Animated.View>
                    <Animated.View style={{ opacity: chevronOpacity2, marginLeft: -8 }}>
                        <Entypo name="chevron-left" size={24} color={leftChevronColor} />
                    </Animated.View>
                    <Animated.View style={{ opacity: chevronOpacity1, marginLeft: -8 }}>
                        <Entypo name="chevron-left" size={24} color={leftChevronColor} />
                    </Animated.View>
                </Animated.View>
            )}
            
            {/* Chevron Animasyonları - Sağ Taraf */}
            {enableIdleAnimation && (
                <Animated.View 
                    style={[
                        styles.chevronContainer, 
                        styles.chevronRight,
                        { 
                            opacity: Animated.multiply(chevronContainerOpacity, chevronVisibility)
                        }
                    ]}
                    pointerEvents="none"
                >
                    <Animated.View style={{ opacity: chevronOpacity1 }}>
                        <Entypo name="chevron-right" size={24} color={rightChevronColor} />
                    </Animated.View>
                    <Animated.View style={{ opacity: chevronOpacity2, marginLeft: -8 }}>
                        <Entypo name="chevron-right" size={24} color={rightChevronColor} />
                    </Animated.View>
                    <Animated.View style={{ opacity: chevronOpacity3, marginLeft: -8 }}>
                        <Entypo name="chevron-right" size={24} color={rightChevronColor} />
                    </Animated.View>
                </Animated.View>
            )}

            {/* Sol seçenek */}
            <Animated.View style={[
                styles.optionContainer, 
                { 
                    opacity: enableIdleAnimation 
                        ? Animated.multiply(
                            Animated.add(
                                optionsOpacity, 
                                Animated.subtract(1, chevronVisibility)
                            ),
                            leftOptionOpacityValue
                          )
                        : leftOptionOpacityValue
                }
            ]}>
                <Text
                    style={[
                        styles.optionText,
                        {
                            fontSize: optionFontSize,
                            color: optionColor,
                        },
                        optionTextStyle,
                        leftOptionTextStyle,
                    ]}
                >
                    {leftOption}
                </Text>
            </Animated.View>

            {/* Sağ seçenek */}
            <Animated.View style={[
                styles.optionContainer, 
                { 
                    opacity: enableIdleAnimation 
                        ? Animated.multiply(
                            Animated.add(
                                optionsOpacity, 
                                Animated.subtract(1, chevronVisibility)
                            ),
                            rightOptionOpacityValue
                          )
                        : rightOptionOpacityValue
                }
            ]}>
                <Text
                    style={[
                        styles.optionText,
                        {
                            fontSize: optionFontSize,
                            color: optionColor,
                        },
                        optionTextStyle,
                        rightOptionTextStyle,
                    ]}
                >
                    {rightOption}
                </Text>
            </Animated.View>

            {/* Kaydırılabilir buton (thumb) */}
            <Animated.View
                style={[
                    styles.thumb,
                    {
                        width: thumbSize,
                        height: thumbSize,
                        backgroundColor: thumbBackgroundColor,
                        borderRadius: thumbBorderRadius,
                        borderWidth: thumbBorderWidth,
                        borderColor: thumbBorderColor,
                        left: thumbCenterPosition,
                        transform: [{ translateX: pan }],
                    },
                    thumbStyle,
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.thumbIndicator}>
                    <View style={styles.thumbLine} />
                    <View style={styles.thumbLine} />
                    <View style={styles.thumbLine} />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
    },
    activeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    optionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    optionText: {
        fontWeight: '600',
    },
    thumb: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 2,
    },
    thumbIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    thumbLine: {
        width: 2,
        height: 15,
        backgroundColor: '#CCCCCC',
        borderRadius: 1,
    },
    chevronContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    chevronLeft: {
        left: 20,
    },
    chevronRight: {
        right: 20,
    },
});

export default SwipeSlider;

