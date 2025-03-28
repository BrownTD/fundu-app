## React Native SVG Logo Integration (Expo - Managed Workflow)

### ✅ 1. Converted the `.svg` into a `.tsx` React Native component

- Created a file: `assets/images/funduLogo.tsx`
- Used `react-native-svg` primitives (`Svg`, `Path`, `Polyline`, `Line`, etc.)
- Removed web-only elements like `<style>`, `<defs>`, and `className`
- Exported a reusable component with support for custom styling via props:

```tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';

export type LogoProps = {
  style?: ViewStyle;
};

export default function FunduLogo({ style }: LogoProps) {
  const strokeProps = {
    stroke: '#5f5ba8',
    strokeWidth: 4,
    strokeMiterlimit: 10,
    fill: 'none',
  };

  return (
    <Svg viewBox="0 0 1100 1100" style={style}>
      <Path d="..." {...strokeProps} />
      {/* other SVG elements */}
    </Svg>
  );
}
```
### ✅ 2. Styled the logo using the React Native StyleSheet
- Handled sizing and layout via styles.logo (not inline props):
```
logo: {
  width: 160,
  height: 160,
  alignSelf: "center",
  marginBottom: 20,
}
```
### ✅ 3. Imported and rendered the logo in index.tsx
- Import statement:
```import Logo from "@/assets/images/funduLogo";```
- Usage inside JSX:
```<Logo style={styles.logo} />```
