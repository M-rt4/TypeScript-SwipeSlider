# SwipeSlider Komponenti

Özelleştirilebilir sağa-sola kaydırmalı karar verme komponenti.

## Özellikler

✅ Ortada sağa ve sola kaydırılabilen buton
✅ Sol ve sağ seçenekler
✅ Tam özelleştirilebilir stil özellikleri
✅ Animasyonlu geri dönüş
✅ Kaydırma hassasiyeti ayarlanabilir
✅ Her yön için farklı aktif renk desteği
✅ Ayrı callback fonksiyonları (onSwipeLeft & onSwipeRight)
✅ Chevron idle animasyonu - merkezden dışa doğru dalga efekti
✅ Akıllı görünürlük - chevronlar sadece buton merkezdeyken görünür
✅ Otomatik geçiş - buton kaydırıldığında chevronlar gizlenir, metinler görünür
✅ TypeScript desteği

## Temel Kullanım

```tsx
import SwipeSlider from '@/app/components/SwipeSlider';

function MyComponent() {
    const handleSwipeLeft = () => {
        console.log('Kullanıcı sola kaydırdı');
    };

    const handleSwipeRight = () => {
        console.log('Kullanıcı sağa kaydırdı');
    };

    return (
        <SwipeSlider
            leftOption="Hayır"
            rightOption="Evet"
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            activeBackgroundColorLeft="#FF4444"
            activeBackgroundColorRight="#4CAF50"
        />
    );
}
```

## Prop Listesi

### Temel Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `leftOption` | `string` | **Zorunlu** | Sol taraftaki seçenek metni |
| `rightOption` | `string` | **Zorunlu** | Sağ taraftaki seçenek metni |
| `onSwipeLeft` | `() => void` | `undefined` | Sola kaydırma callback fonksiyonu |
| `onSwipeRight` | `() => void` | `undefined` | Sağa kaydırma callback fonksiyonu |
| `disabled` | `boolean` | `false` | Slider'ı devre dışı bırakır |

### Container (Dış Kutu) Style Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Özel container stili |
| `containerWidth` | `number` | `SCREEN_WIDTH * 0.85` | Container genişliği |
| `containerHeight` | `number` | `60` | Container yüksekliği |
| `containerBackgroundColor` | `string` | `'#E0E0E0'` | Container arka plan rengi |
| `containerBorderRadius` | `number` | `30` | Container köşe yuvarlaklığı |
| `containerBorderWidth` | `number` | `0` | Container border kalınlığı |
| `containerBorderColor` | `string` | `'transparent'` | Container border rengi |

### Thumb (Kaydırma Butonu) Style Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `thumbSize` | `number` | `50` | Buton boyutu (genişlik ve yükseklik) |
| `thumbBackgroundColor` | `string` | `'#FFFFFF'` | Buton arka plan rengi |
| `thumbBorderRadius` | `number` | `25` | Buton köşe yuvarlaklığı |
| `thumbBorderWidth` | `number` | `2` | Buton border kalınlığı |
| `thumbBorderColor` | `string` | `'#CCCCCC'` | Buton border rengi |
| `thumbStyle` | `StyleProp<ViewStyle>` | `undefined` | Özel buton stili |

### Seçenek Metni Style Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `optionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Her iki seçenek için metin stili |
| `leftOptionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Sadece sol seçenek metin stili |
| `rightOptionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Sadece sağ seçenek metin stili |
| `optionFontSize` | `number` | `16` | Seçenek metin boyutu |
| `optionColor` | `string` | `'#333333'` | Seçenek metin rengi |

### Davranış Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `swipeThreshold` | `number` | `0.4` | Kaydırma hassasiyeti (0-1 arası, 0.5 = %50) |
| `animationDuration` | `number` | `300` | Animasyon süresi (milisaniye) |
| `activeBackgroundColorLeft` | `string` | `'#FF4444'` | Sola kaydırıldığında gösterilen arka plan rengi |
| `activeBackgroundColorRight` | `string` | `'#4CAF50'` | Sağa kaydırıldığında gösterilen arka plan rengi |
| `enableIdleAnimation` | `boolean` | `true` | Boşta chevron animasyonunu etkinleştirir |
| `idleAnimationDuration` | `number` | `1200` | Chevron animasyon döngü süresi (milisaniye) |
| `idleChevronColor` | `string` | `'#999999'` | Chevron oklarının rengi |

## Kullanım Örnekleri

### 1. Onay/Red Slider

```tsx
<SwipeSlider
    leftOption="❌ Red"
    rightOption="✓ Onayla"
    onSwipeLeft={() => console.log('Reddedildi')}
    onSwipeRight={() => console.log('Onaylandı')}
    containerBackgroundColor="#F5F5F5"
    activeBackgroundColorLeft="#FF4444"
    activeBackgroundColorRight="#4CAF50"
    optionColor="#333333"
/>
```

### 2. Özel Renkli Tema (Mor/Pembe)

```tsx
<SwipeSlider
    leftOption="Hayır"
    rightOption="Evet"
    onSwipeLeft={() => console.log('Hayır seçildi')}
    onSwipeRight={() => console.log('Evet seçildi')}
    containerBackgroundColor="#E8D5F2"
    activeBackgroundColorLeft="#E91E63"
    activeBackgroundColorRight="#9C27B0"
    thumbBackgroundColor="#FFFFFF"
    thumbBorderColor="#9C27B0"
    optionColor="#6A1B9A"
/>
```

### 3. Büyük Boyutlu Slider

```tsx
<SwipeSlider
    leftOption="◀ Sol"
    rightOption="Sağ ▶"
    onSwipeLeft={() => console.log('Sol seçildi')}
    onSwipeRight={() => console.log('Sağ seçildi')}
    containerHeight={80}
    thumbSize={70}
    thumbBorderRadius={35}
    containerBorderRadius={40}
    optionFontSize={20}
    activeBackgroundColorLeft="#FF5722"
    activeBackgroundColorRight="#2196F3"
/>
```

### 4. Kolay Kaydırma (Düşük Threshold)

```tsx
<SwipeSlider
    leftOption="İptal"
    rightOption="Devam"
    onSwipeLeft={() => console.log('İptal edildi')}
    onSwipeRight={() => console.log('Devam ediliyor')}
    swipeThreshold={0.3}  // %30 kaydırma yeterli
    activeBackgroundColorLeft="#E53935"
    activeBackgroundColorRight="#43A047"
/>
```

### 5. Zor Kaydırma (Yüksek Threshold)

```tsx
<SwipeSlider
    leftOption="Sil"
    rightOption="Onayla"
    onSwipeLeft={() => console.log('Silindi')}
    onSwipeRight={() => console.log('Onaylandı')}
    swipeThreshold={0.7}  // %70 kaydırma gerekli (kritik işlemler için)
    activeBackgroundColorLeft="#D32F2F"
    activeBackgroundColorRight="#388E3C"
/>
```

### 6. Hızlı Animasyon

```tsx
<SwipeSlider
    leftOption="⚡ Hızlı"
    rightOption="Hızlı ⚡"
    onSwipeLeft={() => console.log('Sol')}
    onSwipeRight={() => console.log('Sağ')}
    animationDuration={150}  // 150ms (varsayılan 300ms)
    activeBackgroundColorLeft="#FF9800"
    activeBackgroundColorRight="#FFEB3B"
/>
```

### 7. Border ile Tasarım

```tsx
<SwipeSlider
    leftOption="👎"
    rightOption="👍"
    onSwipeLeft={() => console.log('Beğenilmedi')}
    onSwipeRight={() => console.log('Beğenildi')}
    containerBackgroundColor="#FFFFFF"
    containerBorderWidth={3}
    containerBorderColor="#FFB300"
    activeBackgroundColorLeft="#F44336"
    activeBackgroundColorRight="#4CAF50"
    thumbBorderWidth={3}
    thumbBorderColor="#F57F17"
/>
```

### 8. Kompakt Slider

```tsx
<SwipeSlider
    leftOption="❌"
    rightOption="✓"
    onSwipeLeft={() => console.log('Hayır')}
    onSwipeRight={() => console.log('Evet')}
    containerHeight={45}
    containerWidth={200}
    thumbSize={35}
    thumbBorderRadius={17.5}
    containerBorderRadius={22.5}
    optionFontSize={18}
    activeBackgroundColorLeft="#FF5252"
    activeBackgroundColorRight="#69F0AE"
/>
```

### 9. Idle Animasyon Kapalı

```tsx
<SwipeSlider
    leftOption="Statik"
    rightOption="Slider"
    onSwipeLeft={() => console.log('Sol')}
    onSwipeRight={() => console.log('Sağ')}
    enableIdleAnimation={false}  // Animasyon kapalı
/>
```

### 10. Özel Idle Animasyon

```tsx
<SwipeSlider
    leftOption="← Kaydır"
    rightOption="Kaydır →"
    onSwipeLeft={() => console.log('Sol')}
    onSwipeRight={() => console.log('Sağ')}
    enableIdleAnimation={true}
    idleAnimationDuration={800}    // Daha hızlı animasyon
    idleChevronColor="#5C6BC0"     // Mavi chevronlar
/>
```

## Gerçek Hayat Senaryoları

### E-ticaret: Sepete Ekle / Favoriye Ekle

```tsx
<SwipeSlider
    leftOption="❤️ Favori"
    rightOption="🛒 Sepet"
    onSwipeLeft={() => addToFavorites(product)}
    onSwipeRight={() => addToCart(product)}
    activeBackgroundColorLeft="#FF6B6B"
    activeBackgroundColorRight="#4CAF50"
/>
```

### Sosyal Medya: Beğen / Beğenme

```tsx
<SwipeSlider
    leftOption="👎 Dislike"
    rightOption="👍 Like"
    onSwipeLeft={() => handleLike(false)}
    onSwipeRight={() => handleLike(true)}
    containerBackgroundColor="#F0F0F0"
    activeBackgroundColorLeft="#F44336"
    activeBackgroundColorRight="#4CAF50"
/>
```

### Görev Yönetimi: Tamamla / Sil

```tsx
<SwipeSlider
    leftOption="🗑️ Sil"
    rightOption="✓ Tamamla"
    onSwipeLeft={() => deleteTask(task.id)}
    onSwipeRight={() => completeTask(task.id)}
    swipeThreshold={0.5}
    activeBackgroundColorLeft="#E53935"
    activeBackgroundColorRight="#43A047"
/>
```

### Oylama Sistemi

```tsx
<SwipeSlider
    leftOption="Katılmıyorum"
    rightOption="Katılıyorum"
    onSwipeLeft={() => submitVote(pollId, 'disagree')}
    onSwipeRight={() => submitVote(pollId, 'agree')}
    containerBackgroundColor="#E3F2FD"
    activeBackgroundColorLeft="#F44336"
    activeBackgroundColorRight="#2196F3"
/>
```

## İpuçları

1. **Threshold Ayarı**: Kritik işlemler için (silme gibi) yüksek threshold (0.6-0.7) kullanın
2. **Renk Seçimi**: 
   - Sol ve sağ için farklı renkler kullanarak kullanıcıya görsel geri bildirim verin
   - Olumsuz işlemler için kırmızı/turuncu tonları (#FF4444, #E53935)
   - Olumlu işlemler için yeşil/mavi tonları (#4CAF50, #2196F3)
   - Aktif arka plan renkleri ile container rengi arasında kontrast olsun
3. **Boyut Oranı**: Thumb boyutu container yüksekliğinin ~%80-85'i kadar olmalı
4. **Border Radius**: Container border radius'u container yüksekliğinin yarısı kadar olmalı
5. **Animasyon**: Hızlı etkileşimler için 150-200ms, normal için 300ms kullanın
6. **Idle Animasyon**: 
   - Varsayılan olarak açık (enableIdleAnimation={true})
   - Arka planda 3 chevron ok merkezden dışa doğru **senkronize dalga** efekti yapar
   - Tek bir döngü içinde mükemmel senkronizasyon - her tekrarda aynı pattern
   - Her chevron maksimum opacity'e ulaştığında bir sonraki fade-in başlar (paralel geçiş)
   - Chevronlar overlap ederek kesintisiz smooth bir dalga etkisi oluşturur
   - **Chevronlar sadece buton merkezdeyken görünür** (buton kaydırıldığında otomatik gizlenir)
   - Buton kaydırıldıkça chevronlar fade-out, seçenek metinleri fade-in olur
   - Kullanıcıya butonun hareket ettirilebilir olduğunu görsel olarak gösterir
   - İlk kullanımda kullanıcı deneyimini artırır
   - Liste veya çok sayıda slider varsa kapatmayı düşünün (performans için)

## Demo Sayfası

Tüm örnekleri görmek için `SwipeSliderExample.tsx` dosyasına bakın:

```tsx
import SwipeSliderExample from '@/app/components/SwipeSliderExample';

// Route veya navigation ile kullanın
```

## TypeScript Desteği

Komponent tam TypeScript desteği ile gelir. Tüm proplar tip güvenlidir.

```tsx
import SwipeSlider, { SwipeSliderProps } from '@/app/components/SwipeSlider';

const props: SwipeSliderProps = {
    leftOption: 'Sol',
    rightOption: 'Sağ',
    onSwipeLeft: () => console.log('Sol seçildi'),
    onSwipeRight: () => console.log('Sağ seçildi'),
};
```

## Lisans

Bu komponent UniMeetPoint projesi için geliştirilmiştir.

    