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

/**
 * Yaygın renk adlarını hex kodlarına çevirir
 */
const colorNameToHex = (color: string): string => {
    const colors: Record<string, string> = {
        'black': '#000000',
        'white': '#FFFFFF',
        'red': '#FF0000',
        'green': '#00FF00',
        'blue': '#0000FF',
        'yellow': '#FFFF00',
        'cyan': '#00FFFF',
        'magenta': '#FF00FF',
        'orange': '#FFA500',
        'purple': '#800080',
        'pink': '#FFC0CB',
        'brown': '#A52A2A',
        'gray': '#808080',
        'grey': '#808080',
    };
    return colors[color.toLowerCase()] || color;
};

/**
 * Bir rengin parlaklığını hesaplar ve otomatik kontrast rengi döndürür
 * @param color - Hex renk kodu (#RRGGBB, #RGB) veya renk adı (white, black, vb.)
 * @returns Beyaz (#FFFFFF) veya siyah (#000000)
 */
const getContrastColor = (color: string): string => {
    // Renk adını hex'e çevir
    const hexColor = colorNameToHex(color);
    
    // Hex color'ı RGB'ye çevir
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
    
    // Geçersiz renk kontrolü
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.warn(`[SwipeSlider] Invalid color: ${color}, using default black text`);
        return '#000000';
    }
    
    // Relative luminance hesapla (WCAG formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Luminance 0.5'ten büyükse koyu text, küçükse açık text
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

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
    leftOptionColor?: string;
    rightOptionColor?: string;
    enableTextColorTransition?: boolean;
    enableAutoContrastText?: boolean;
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
    previewGradientDisplay?: 'off' | 'onThumbPress' | 'always';
    
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
    leftOptionColor,
    rightOptionColor,
    enableTextColorTransition = true,
    enableAutoContrastText = false,
    inactiveOptionOpacity = 0.3,
    swipeThreshold = 0.4,
    animationDuration = 300,
    activeBackgroundColorLeft = '#FF4444',
    activeBackgroundColorRight = '#4CAF50',
    centerBackgroundColor,
    enableGradient = true,
    previewGradientDisplay = 'onThumbPress',
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
    
    // Seçenek text renkleri
    let finalLeftOptionColor = leftOptionColor || optionColor;
    let finalRightOptionColor = rightOptionColor || optionColor;
    let finalOptionColor = optionColor;
    
    // Otomatik kontrast modu açıksa, arka plan rengine göre text rengini hesapla
    if (enableAutoContrastText) {
        finalLeftOptionColor = leftOptionColor || getContrastColor(activeBackgroundColorLeft);
        finalRightOptionColor = rightOptionColor || getContrastColor(activeBackgroundColorRight);
        // optionColor'ı container background'una göre hesapla (merkezdeki text için)
        finalOptionColor = optionColor === '#333333' 
            ? getContrastColor(containerBackgroundColor)
            : optionColor;
    }
    const pan = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTouching, setIsTouching] = useState(false);
    
    // Chevron opacity animasyonları
    const chevronOpacity1 = useRef(new Animated.Value(0.3)).current;
    const chevronOpacity2 = useRef(new Animated.Value(0.3)).current;
    const chevronOpacity3 = useRef(new Animated.Value(0.3)).current;
    const chevronContainerOpacity = useRef(new Animated.Value(1)).current;
    const optionsOpacity = useRef(new Animated.Value(0)).current;
    
    // Preview gradient opacity kontrolü
    const previewGradientOpacity = useRef(new Animated.Value(
        previewGradientDisplay === 'always' ? 1 : 0
    )).current;
    
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

    // Preview gradient opacity kontrolü
    useEffect(() => {
        if (previewGradientDisplay === 'off') {
            // Kapalı - hiç gösterme
            previewGradientOpacity.setValue(0);
        } else if (previewGradientDisplay === 'onThumbPress') {
            // Sadece basıldığında - thumb'a basıldığında göster
            Animated.timing(previewGradientOpacity, {
                toValue: isTouching ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            // Always - her zaman göster
            previewGradientOpacity.setValue(1);
        }
    }, [isTouching, previewGradientDisplay]);

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

    // Sol seçenek renk geçişi için overlay opacity (sola kaydırıldıkça özel renk belirginleşir)
    const leftColorTransition = pan.interpolate({
        inputRange: [-maxSlide, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Sağ seçenek renk geçişi için overlay opacity (sağa kaydırıldıkça özel renk belirginleşir)
    const rightColorTransition = pan.interpolate({
        inputRange: [0, maxSlide],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // Preview gradient fade - kaydırma başladığında opacity düşsün
    const swipeFadeOpacity = pan.interpolate({
        inputRange: [-maxSlide, 0, maxSlide],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View
            style={[
                {
                    width: containerWidth,
                    height: containerHeight,
                    borderRadius: containerBorderRadius,
                    borderWidth: containerBorderWidth,
                    borderColor: containerBorderColor,
                    overflow: 'hidden',
                },
                containerStyle,
            ]}
        >
            {/* Container background - üç renkli gradient (sol → merkez → sağ) */}
            {enableGradient && previewGradientDisplay !== 'off' ? (
                <Animated.View style={[
                    StyleSheet.absoluteFillObject, 
                    { opacity: Animated.multiply(previewGradientOpacity, swipeFadeOpacity) }
                ]}>
                    <LinearGradient
                        colors={[activeBackgroundColorLeft, gradientCenterColor, activeBackgroundColorRight]}
                        locations={[0, 0.5, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFillObject}
                    />
                </Animated.View>
            ) : null}
            
            {/* Fallback background - gradient kapalıysa veya preview off ise */}
            {(!enableGradient || previewGradientDisplay === 'off') && (
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: containerBackgroundColor }]} />
            )}
            
            {/* İçerik container - padding için */}
            <View
                style={[
                    styles.container,
                    {
                        width: containerWidth,
                        height: containerHeight,
                        paddingHorizontal: containerPadding,
                    },
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
                {enableTextColorTransition ? (
                    <>
                        {/* Base text (optionColor or auto contrast) */}
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    fontSize: optionFontSize,
                                    color: finalOptionColor,
                                },
                                optionTextStyle,
                                leftOptionTextStyle,
                            ]}
                        >
                            {leftOption}
                        </Text>
                        
                        {/* Overlay text (leftOptionColor) - sola kaydırıldıkça belirginleşir */}
                        {(leftOptionColor || enableAutoContrastText) && (
                            <Animated.Text
                                style={[
                                    styles.optionText,
                                    styles.optionTextOverlay,
                                    {
                                        fontSize: optionFontSize,
                                        color: finalLeftOptionColor,
                                        opacity: leftColorTransition,
                                    },
                                    optionTextStyle,
                                    leftOptionTextStyle,
                                ]}
                            >
                                {leftOption}
                            </Animated.Text>
                        )}
                    </>
                ) : (
                    /* Text color transition kapalı - doğrudan finalLeftOptionColor kullan */
                    <Text
                        style={[
                            styles.optionText,
                            {
                                fontSize: optionFontSize,
                                color: finalLeftOptionColor,
                            },
                            optionTextStyle,
                            leftOptionTextStyle,
                        ]}
                    >
                        {leftOption}
                    </Text>
                )}
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
                {enableTextColorTransition ? (
                    <>
                        {/* Base text (optionColor or auto contrast) */}
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    fontSize: optionFontSize,
                                    color: finalOptionColor,
                                },
                                optionTextStyle,
                                rightOptionTextStyle,
                            ]}
                        >
                            {rightOption}
                        </Text>
                        
                        {/* Overlay text (rightOptionColor) - sağa kaydırıldıkça belirginleşir */}
                        {(rightOptionColor || enableAutoContrastText) && (
                            <Animated.Text
                                style={[
                                    styles.optionText,
                                    styles.optionTextOverlay,
                                    {
                                        fontSize: optionFontSize,
                                        color: finalRightOptionColor,
                                        opacity: rightColorTransition,
                                    },
                                    optionTextStyle,
                                    rightOptionTextStyle,
                                ]}
                            >
                                {rightOption}
                            </Animated.Text>
                        )}
                    </>
                ) : (
                    /* Text color transition kapalı - doğrudan finalRightOptionColor kullan */
                    <Text
                        style={[
                            styles.optionText,
                            {
                                fontSize: optionFontSize,
                                color: finalRightOptionColor,
                            },
                            optionTextStyle,
                            rightOptionTextStyle,
                        ]}
                    >
                        {rightOption}
                    </Text>
                )}
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
    optionTextOverlay: {
        position: 'absolute',
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

