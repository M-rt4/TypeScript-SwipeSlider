# SwipeSlider Component

A customizable swipe-based decision slider component.

## 🤝 Contributing & Help Wanted

This component is open for contributions! Whether you have ideas for new features, spot bugs that need fixing, or want to improve the code, **pull requests are welcome!**

### 📦 Help Needed: NPM Package

I'm currently looking for help to **publish this component as an NPM package**. If you have experience with:
- Creating and publishing NPM packages
- Setting up proper build configurations for React Native components
- Writing package.json with correct peer dependencies
- Setting up CI/CD for automated releases

**Your help would be greatly appreciated!** Feel free to open an issue or submit a PR with setup instructions.

### 💡 Feature Ideas Welcome

Have an idea for a new feature or improvement? Some areas where contributions would be especially valuable:
- Additional animation effects
- More customization options
- Performance optimizations
- Accessibility improvements (screen readers, haptic feedback)
- Better documentation or examples
- Tests (unit, integration, or visual regression)

### 🐛 Found a Bug?

If you find a bug, please:
1. Check if it's already reported in Issues
2. If not, open a new issue with:
   - A clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable

### 📝 How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**All contributions, no matter how small, are valued and appreciated!** 🙏

---

## Installation & Dependencies

### Required Dependencies

This component requires the following packages:

```bash
# For Expo projects
npm install @expo/vector-icons expo-linear-gradient

# For React Native CLI projects
npm install react-native-vector-icons react-native-linear-gradient
npx react-native link react-native-vector-icons
npx react-native link react-native-linear-gradient
```

**Important:** This component uses:
1. **Chevron icons** from `@expo/vector-icons` (Entypo icon set) for the idle animation
2. **Linear gradients** from `expo-linear-gradient` for smooth background transitions

If you're using this component outside of Expo, you'll need to modify the imports in `SwipeSlider.tsx`:
  ```tsx
  // Change these:
  import { Entypo } from '@expo/vector-icons';
  import { LinearGradient } from 'expo-linear-gradient';
  
  // To these (for React Native CLI):
  import Entypo from 'react-native-vector-icons/Entypo';
  import LinearGradient from 'react-native-linear-gradient';
  ```

### Peer Dependencies

- React Native (with Animated API support)
- React (16.8+ for hooks support)

## Features

- ✅ Center-positioned button that can be swiped left and right
- ✅ Left and right options
- ✅ Fully customizable style properties
- ✅ Animated return to center
- ✅ Adjustable swipe sensitivity
- ✅ Different active colors for each direction
- ✅ Gradient background transitions - smooth fade from edges to center (toggleable)
- ✅ Solid background mode - classic full-color backgrounds (set enableGradient={false})
- ✅ Dynamic option opacity - inactive option fades when swiping opposite direction
- ✅ Separate callback functions (onSwipeLeft & onSwipeRight)
- ✅ Chevron idle animation - wave effect from center to edges
- ✅ Smart visibility - chevrons only visible when button is centered
- ✅ Auto transition - chevrons fade out and text fades in when button is swiped
- ✅ Smart chevron colors - automatically match active background colors by default
- ✅ TypeScript support

## Basic Usage

```tsx
import SwipeSlider from '@/app/components/SwipeSlider';

function MyComponent() {
    const handleSwipeLeft = () => {
        console.log('User swiped left');
    };

    const handleSwipeRight = () => {
        console.log('User swiped right');
    };

    return (
        <SwipeSlider
            leftOption="No"
            rightOption="Yes"
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            activeBackgroundColorLeft="#FF4444"    // Red gradient from left
            activeBackgroundColorRight="#4CAF50"   // Green gradient from right
            // Chevrons will automatically use these colors
            // Left chevrons: #FF4444 (red)
            // Right chevrons: #4CAF50 (green)
            // Background gradients fade from edges to center
        />
    );
}
```

### Visual Effect

When you swipe, the background creates a beautiful gradient effect:

```
Left Swipe (Red to Center):
🔴🔴🔴🟡🟡🟡⚪⚪⚪  →  Red gradient fades from left edge to center color

Right Swipe (Center to Green):
⚪⚪⚪🟡🟡🟡🟢🟢🟢  →  Green gradient fades from center color to right edge

Idle (Center):
⚪⚪⚪⚪⚪⚪⚪⚪⚪  →  Only container background visible, chevrons animated

Both Active:
🔴🔴🟡🟡⚪🟡🟡🟢🟢  →  Beautiful dual gradient effect (if both directions swiped)
```

**Gradient Flow:**
- **Left**: `activeBackgroundColorLeft` → `centerBackgroundColor`
- **Right**: `centerBackgroundColor` → `activeBackgroundColorRight`
- Creates a smooth transition from edges to center

**Inactive Option Opacity Effect:**
```
Swiping Right (→):
"No" fades to 0.3    ⚪→     "Yes" stays 1.0
(inactive)                   (active)

Swiping Left (←):
"No" stays 1.0       ←⚪     "Yes" fades to 0.3
(active)                     (inactive)

Center (idle):
"No" hidden          ⚪      "Yes" hidden
(chevrons visible)           (chevrons visible)
```

## Props List

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftOption` | `string` | **Required** | Text for left option |
| `rightOption` | `string` | **Required** | Text for right option |
| `onSwipeLeft` | `() => void` | `undefined` | Callback function for left swipe |
| `onSwipeRight` | `() => void` | `undefined` | Callback function for right swipe |
| `disabled` | `boolean` | `false` | Disables the slider |

### Container Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom container style |
| `containerWidth` | `number` | `SCREEN_WIDTH * 0.85` | Container width |
| `containerHeight` | `number` | `60` | Container height |
| `containerBackgroundColor` | `string` | `'#E0E0E0'` | Container background color |
| `containerBorderRadius` | `number` | `30` | Container border radius |
| `containerBorderWidth` | `number` | `0` | Container border width |
| `containerBorderColor` | `string` | `'transparent'` | Container border color |
| `containerPadding` | `number` | `5` | Container horizontal padding (affects thumb movement range) |

### Thumb (Swipe Button) Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `thumbSize` | `number` | `50` | Button size (width and height) |
| `thumbBackgroundColor` | `string` | `'#FFFFFF'` | Button background color |
| `thumbBorderRadius` | `number` | `25` | Button border radius |
| `thumbBorderWidth` | `number` | `2` | Button border width |
| `thumbBorderColor` | `string` | `'#CCCCCC'` | Button border color |
| `thumbStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom button style |

### Option Text Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `optionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Text style for both options |
| `leftOptionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Text style for left option only |
| `rightOptionTextStyle` | `StyleProp<TextStyle>` | `undefined` | Text style for right option only |
| `optionFontSize` | `number` | `16` | Option text size |
| `optionColor` | `string` | `'#333333'` | Option text color |
| `inactiveOptionOpacity` | `number` | `0.3` | Opacity of the non-active option when swiping (0-1 range) |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `swipeThreshold` | `number` | `0.4` | Swipe sensitivity (0-1 range, 0.5 = 50%) |
| `animationDuration` | `number` | `300` | Animation duration (milliseconds) |
| `activeBackgroundColorLeft` | `string` | `'#FF4444'` | Background color shown when swiping left (gradient start or solid) |
| `activeBackgroundColorRight` | `string` | `'#4CAF50'` | Background color shown when swiping right (gradient end or solid) |
| `centerBackgroundColor` | `string` | `containerBackgroundColor` | Center color for gradients (only used if enableGradient=true) |
| `enableGradient` | `boolean` | `true` | Enables gradient backgrounds (if false, uses solid colors) |
| `enableIdleAnimation` | `boolean` | `true` | Enables idle chevron animation |
| `idleAnimationDuration` | `number` | `1200` | Chevron animation loop duration (milliseconds) |
| `idleChevronColorLeft` | `string` | `activeBackgroundColorLeft` | Left chevron arrows color (defaults to active background color) |
| `idleChevronColorRight` | `string` | `activeBackgroundColorRight` | Right chevron arrows color (defaults to active background color) |

## Usage Examples

### 1. Approve/Reject Slider

```tsx
<SwipeSlider
    leftOption="❌ Reject"
    rightOption="✓ Approve"
    onSwipeLeft={() => console.log('Rejected')}
    onSwipeRight={() => console.log('Approved')}
    containerBackgroundColor="#F5F5F5"
    activeBackgroundColorLeft="#FF4444"
    activeBackgroundColorRight="#4CAF50"
    optionColor="#333333"
/>
```

### 2. Custom Color Theme (Purple/Pink)

```tsx
<SwipeSlider
    leftOption="No"
    rightOption="Yes"
    onSwipeLeft={() => console.log('No selected')}
    onSwipeRight={() => console.log('Yes selected')}
    containerBackgroundColor="#E8D5F2"
    activeBackgroundColorLeft="#E91E63"
    activeBackgroundColorRight="#9C27B0"
    thumbBackgroundColor="#FFFFFF"
    thumbBorderColor="#9C27B0"
    optionColor="#6A1B9A"
/>
```

### 3. Large Slider

```tsx
<SwipeSlider
    leftOption="◀ Left"
    rightOption="Right ▶"
    onSwipeLeft={() => console.log('Left selected')}
    onSwipeRight={() => console.log('Right selected')}
    containerHeight={80}
    thumbSize={70}
    thumbBorderRadius={35}
    containerBorderRadius={40}
    optionFontSize={20}
    activeBackgroundColorLeft="#FF5722"
    activeBackgroundColorRight="#2196F3"
/>
```

### 4. Easy Swipe (Low Threshold)

```tsx
<SwipeSlider
    leftOption="Cancel"
    rightOption="Continue"
    onSwipeLeft={() => console.log('Cancelled')}
    onSwipeRight={() => console.log('Continuing')}
    swipeThreshold={0.3}  // 30% swipe is enough
    activeBackgroundColorLeft="#E53935"
    activeBackgroundColorRight="#43A047"
/>
```

### 5. Hard Swipe (High Threshold)

```tsx
<SwipeSlider
    leftOption="Delete"
    rightOption="Confirm"
    onSwipeLeft={() => console.log('Deleted')}
    onSwipeRight={() => console.log('Confirmed')}
    swipeThreshold={0.7}  // 70% swipe required (for critical actions)
    activeBackgroundColorLeft="#D32F2F"
    activeBackgroundColorRight="#388E3C"
/>
```

### 6. Fast Animation

```tsx
<SwipeSlider
    leftOption="⚡ Fast"
    rightOption="Fast ⚡"
    onSwipeLeft={() => console.log('Left')}
    onSwipeRight={() => console.log('Right')}
    animationDuration={150}  // 150ms (default 300ms)
    activeBackgroundColorLeft="#FF9800"
    activeBackgroundColorRight="#FFEB3B"
/>
```

### 7. Border Design

```tsx
<SwipeSlider
    leftOption="👎"
    rightOption="👍"
    onSwipeLeft={() => console.log('Disliked')}
    onSwipeRight={() => console.log('Liked')}
    containerBackgroundColor="#FFFFFF"
    containerBorderWidth={3}
    containerBorderColor="#FFB300"
    activeBackgroundColorLeft="#F44336"
    activeBackgroundColorRight="#4CAF50"
    thumbBorderWidth={3}
    thumbBorderColor="#F57F17"
/>
```

### 8. Compact Slider

```tsx
<SwipeSlider
    leftOption="❌"
    rightOption="✓"
    onSwipeLeft={() => console.log('No')}
    onSwipeRight={() => console.log('Yes')}
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

### 9. Solid Background (No Gradient)

```tsx
<SwipeSlider
    leftOption="Decline"
    rightOption="Accept"
    onSwipeLeft={() => console.log('Declined')}
    onSwipeRight={() => console.log('Accepted')}
    activeBackgroundColorLeft="#FF5722"
    activeBackgroundColorRight="#4CAF50"
    enableGradient={false}  // Solid colors instead of gradient
    inactiveOptionOpacity={0.2}
/>
```

**Effect:** Entire container fills with solid color (no fade to center)

### 10. Custom Center Gradient

```tsx
<SwipeSlider
    leftOption="← Swipe"
    rightOption="Swipe →"
    onSwipeLeft={() => console.log('Left')}
    onSwipeRight={() => console.log('Right')}
    containerBackgroundColor="#EDE7F6"
    activeBackgroundColorLeft="#FF4081"       // Pink
    activeBackgroundColorRight="#00BCD4"      // Cyan
    centerBackgroundColor="#F3E5F5"           // Light purple (custom center)
    enableIdleAnimation={true}
    idleAnimationDuration={1800}
    idleChevronColorLeft="#FF4081"            // Pink chevrons
    idleChevronColorRight="#00BCD4"           // Cyan chevrons
/>
```

**Gradient Effect:**
- Left gradient: Pink (#FF4081) → Light Purple (#F3E5F5)
- Right gradient: Light Purple (#F3E5F5) → Cyan (#00BCD4)

## Real-World Scenarios

### E-commerce: Add to Cart / Favorites

```tsx
<SwipeSlider
    leftOption="❤️ Favorite"
    rightOption="🛒 Cart"
    onSwipeLeft={() => addToFavorites(product)}
    onSwipeRight={() => addToCart(product)}
    activeBackgroundColorLeft="#FF6B6B"
    activeBackgroundColorRight="#4CAF50"
/>
```

### Social Media: Like / Dislike

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

### Task Management: Complete / Delete

```tsx
<SwipeSlider
    leftOption="🗑️ Delete"
    rightOption="✓ Complete"
    onSwipeLeft={() => deleteTask(task.id)}
    onSwipeRight={() => completeTask(task.id)}
    swipeThreshold={0.5}
    activeBackgroundColorLeft="#E53935"
    activeBackgroundColorRight="#43A047"
/>
```

### Voting System

```tsx
<SwipeSlider
    leftOption="Disagree"
    rightOption="Agree"
    onSwipeLeft={() => submitVote(pollId, 'disagree')}
    onSwipeRight={() => submitVote(pollId, 'agree')}
    containerBackgroundColor="#E3F2FD"
    activeBackgroundColorLeft="#F44336"
    activeBackgroundColorRight="#2196F3"
/>
```

## Tips

1. **Threshold Setting**: Use high threshold (0.6-0.7) for critical actions (like delete)
2. **Color Selection**: 
   - Use different colors for left and right to give visual feedback
   - Use red/orange tones for negative actions (#FF4444, #E53935)
   - Use green/blue tones for positive actions (#4CAF50, #2196F3)
   - Ensure contrast between active background colors and container color
   - **Gradient Effect** (enabled by default with `enableGradient={true}`):
     - Left gradient: `activeBackgroundColorLeft` → `centerBackgroundColor`
     - Right gradient: `centerBackgroundColor` → `activeBackgroundColorRight`
     - Default `centerBackgroundColor` = `containerBackgroundColor` (seamless integration)
     - Creates a more natural and elegant visual feedback
     - Both gradients can be visible simultaneously creating a beautiful dual-gradient effect
   - **Solid Background** (set `enableGradient={false}`):
     - Entire container fills with solid active background color
     - Classic look without gradient fade
     - Useful for simpler designs or when gradient doesn't fit your theme
3. **Size Ratio**: Thumb size should be ~80-85% of container height
4. **Border Radius**: Container border radius should be about half of container height
5. **Animation**: Use 150-200ms for fast interactions, 300ms for normal
6. **Inactive Option Opacity**:
   - Default is 0.3 - subtle fade effect for better focus
   - Set to 1.0 to keep both options always fully visible
   - Set to 0.1-0.2 for more dramatic fade effect
   - Creates visual focus on the direction being swiped
   - **Effect**: When swiping right, left option fades to this opacity (and vice versa)
7. **Container Padding**: 
   - Default is 5px - provides buffer space for smooth thumb movement
   - Increase for larger containers (e.g., 8-10px for 80-90px height)
   - Decrease for compact designs (e.g., 3-4px for small sliders)
   - **Important**: Thumb movement range is automatically calculated based on container size and padding
   - **Math**: 
     ```
     Thumb Center = (containerWidth - thumbSize) / 2
     Max Slide Distance = Thumb Center - containerPadding
     
     Left Edge: Thumb Center - Max Slide = containerPadding ✓
     Right Edge: Thumb Center + Max Slide = containerWidth - thumbSize - containerPadding ✓
     ```
8. **Idle Animation**: 
   - Enabled by default (enableIdleAnimation={true})
   - 3 chevron arrows create a **synchronized wave** effect from center to edges
   - Perfect synchronization in a single loop - same pattern every repeat
   - When each chevron reaches maximum opacity, the next one starts fading in (parallel transition)
   - Chevrons overlap to create a seamless smooth wave effect
   - **Chevrons only visible when button is centered** (automatically hidden when button is swiped)
   - As button is swiped, chevrons fade out and option text fades in
   - **Smart color matching**: Chevrons automatically use active background colors by default
     - Left chevrons → activeBackgroundColorLeft (default: red)
     - Right chevrons → activeBackgroundColorRight (default: green)
     - Can be overridden with idleChevronColorLeft/Right for custom colors
   - Visually indicates to user that button is swipeable
   - Improves first-time user experience
   - Consider disabling for lists with many sliders (for performance)

## Demo Page

To see all examples, check the `SwipeSliderExample.tsx` file:

```tsx
import SwipeSliderExample from '@/app/components/SwipeSliderExample';

// Use with route or navigation
```

## TypeScript Support

The component comes with full TypeScript support. All props are type-safe.

```tsx
import SwipeSlider, { SwipeSliderProps } from '@/app/components/SwipeSlider';

const props: SwipeSliderProps = {
    leftOption: 'Left',
    rightOption: 'Right',
    onSwipeLeft: () => console.log('Left selected'),
    onSwipeRight: () => console.log('Right selected'),
};
```

## Troubleshooting

### Error: "Unable to resolve module @expo/vector-icons" or "expo-linear-gradient"

If you encounter these errors, it means you're missing dependencies:

**For Expo projects:**
```bash
npm install @expo/vector-icons expo-linear-gradient
# or
yarn add @expo/vector-icons expo-linear-gradient
```

**For React Native CLI projects:**
```bash
npm install react-native-vector-icons react-native-linear-gradient
npx react-native link react-native-vector-icons
npx react-native link react-native-linear-gradient

# For iOS (if using CocoaPods)
cd ios && pod install && cd ..
```

Then update the imports in `SwipeSlider.tsx`:
```tsx
// Change from:
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// To:
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
```

### Disabling Features to Reduce Dependencies

If you have issues with dependencies, you can disable certain features:

#### Disable Idle Animation (Removes @expo/vector-icons dependency)
```tsx
<SwipeSlider
    leftOption="No"
    rightOption="Yes"
    enableIdleAnimation={false}  // Disables chevron animation
    onSwipeLeft={handleLeft}
    onSwipeRight={handleRight}
/>
```

#### Disable Gradient (Removes expo-linear-gradient dependency)
```tsx
<SwipeSlider
    leftOption="No"
    rightOption="Yes"
    enableGradient={false}  // Uses solid colors instead
    onSwipeLeft={handleLeft}
    onSwipeRight={handleRight}
/>
```

#### Minimal Setup (No External Dependencies)
```tsx
<SwipeSlider
    leftOption="No"
    rightOption="Yes"
    enableIdleAnimation={false}  // No vector icons needed
    enableGradient={false}        // No linear gradient needed
    onSwipeLeft={handleLeft}
    onSwipeRight={handleRight}
/>
```

**Note:** With both features disabled, the component only requires React Native's core Animated API.

## License

This component was developed for the UniMeetPoint project.
