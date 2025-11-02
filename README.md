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
npm install @expo/vector-icons

# For React Native CLI projects
npm install react-native-vector-icons
npx react-native link react-native-vector-icons
```

**Important:** This component uses chevron icons from `@expo/vector-icons` (Entypo icon set) for the idle animation. If you're using this component outside of Expo:
- Install `react-native-vector-icons` instead
- You may need to modify the import statement in `SwipeSlider.tsx`:
  ```tsx
  // Change this:
  import { Entypo } from '@expo/vector-icons';
  
  // To this (for React Native CLI):
  import Entypo from 'react-native-vector-icons/Entypo';
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
- ✅ Separate callback functions (onSwipeLeft & onSwipeRight)
- ✅ Chevron idle animation - wave effect from center to edges
- ✅ Smart visibility - chevrons only visible when button is centered
- ✅ Auto transition - chevrons fade out and text fades in when button is swiped
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
            activeBackgroundColorLeft="#FF4444"
            activeBackgroundColorRight="#4CAF50"
        />
    );
}
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

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `swipeThreshold` | `number` | `0.4` | Swipe sensitivity (0-1 range, 0.5 = 50%) |
| `animationDuration` | `number` | `300` | Animation duration (milliseconds) |
| `activeBackgroundColorLeft` | `string` | `'#FF4444'` | Background color shown when swiping left |
| `activeBackgroundColorRight` | `string` | `'#4CAF50'` | Background color shown when swiping right |
| `enableIdleAnimation` | `boolean` | `true` | Enables idle chevron animation |
| `idleAnimationDuration` | `number` | `1200` | Chevron animation loop duration (milliseconds) |
| `idleChevronColor` | `string` | `'#999999'` | Chevron arrows color |

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

### 9. Idle Animation Disabled

```tsx
<SwipeSlider
    leftOption="Static"
    rightOption="Slider"
    onSwipeLeft={() => console.log('Left')}
    onSwipeRight={() => console.log('Right')}
    enableIdleAnimation={false}  // Animation off
/>
```

### 10. Custom Idle Animation

```tsx
<SwipeSlider
    leftOption="← Swipe"
    rightOption="Swipe →"
    onSwipeLeft={() => console.log('Left')}
    onSwipeRight={() => console.log('Right')}
    enableIdleAnimation={true}
    idleAnimationDuration={800}    // Faster animation
    idleChevronColor="#5C6BC0"     // Blue chevrons
/>
```

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
3. **Size Ratio**: Thumb size should be ~80-85% of container height
4. **Border Radius**: Container border radius should be about half of container height
5. **Animation**: Use 150-200ms for fast interactions, 300ms for normal
6. **Idle Animation**: 
   - Enabled by default (enableIdleAnimation={true})
   - 3 chevron arrows create a **synchronized wave** effect from center to edges
   - Perfect synchronization in a single loop - same pattern every repeat
   - When each chevron reaches maximum opacity, the next one starts fading in (parallel transition)
   - Chevrons overlap to create a seamless smooth wave effect
   - **Chevrons only visible when button is centered** (automatically hidden when button is swiped)
   - As button is swiped, chevrons fade out and option text fades in
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

### Error: "Unable to resolve module @expo/vector-icons"

If you encounter this error, it means you're missing the icon dependency:

**For Expo projects:**
```bash
npm install @expo/vector-icons
# or
yarn add @expo/vector-icons
```

**For React Native CLI projects:**
```bash
npm install react-native-vector-icons
npx react-native link react-native-vector-icons

# For iOS (if using CocoaPods)
cd ios && pod install && cd ..
```

Then update the import in `SwipeSlider.tsx`:
```tsx
// Change from:
import { Entypo } from '@expo/vector-icons';

// To:
import Entypo from 'react-native-vector-icons/Entypo';
```

### Disabling Idle Animation (If Icon Issues Persist)

If you continue to have issues with icons and want to use the component without the idle animation:

```tsx
<SwipeSlider
    leftOption="No"
    rightOption="Yes"
    enableIdleAnimation={false}  // Disables chevron animation
    onSwipeLeft={handleLeft}
    onSwipeRight={handleRight}
/>
```

This will disable the chevron animation and the component will work without the icon dependency (though you'll lose the visual hint feature).

## License

This component was developed for the UniMeetPoint project.
