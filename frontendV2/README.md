# Frontend (Prototype)

A modern crowdfunding application frontend built with React (using TSX) and Expo. This project implements a rich set of UI components, dynamic routing, and ios styling to support a seamless donor and organization experience.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Features](#features)
- [Challenges](#challenges)
- [Dependencies](#dependencies)
- [License](#license)

# Project Structure

The project is organized as follows:

```plaintext
frontendV2
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx            # Layout for tab-based navigation
│   │   ├── campaignCode.tsx       # Component for campaign codes
│   │   ├── campaignDetails.tsx    # Display campaign details
│   │   ├── campaignSetup.tsx      # Screen to set up a new campaign
│   │   ├── customGift.tsx         # Custom gift options for donors
│   │   ├── detailsScreen.tsx      # Detailed view screen
│   │   ├── donationSuccess.tsx    # Donation success confirmation
│   │   ├── donorProfile.tsx       # Donor profile screen
│   │   ├── historyScreen.tsx      # Donation history view
│   │   ├── homeScreen.tsx         # Home screen
│   │   ├── index.tsx              # Entry point for tabs
│   │   ├── login.tsx              # Login screen for users
│   │   ├── organizationProfile.tsx# Organization profile screen
│   │   ├── paymentScreen.tsx      # Payment processing screen
│   │   ├── profileDetails.tsx     # Detailed profile view
│   │   ├── selectGift.tsx         # Screen for selecting gifts
│   │   ├── signinScreen.tsx       # Sign-in screen for donors/organizations
│   │   └── signup.tsx             # Signup screen for new users
│   ├── +not-found.tsx             # Fallback for undefined routes
│   └── _layout.tsx                # Global layout for the app
├── assets
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf  # Custom font used in the app
│   └── images                     # Various images and logos used in the UI
├── components
│   ├── Collapsible.tsx            # UI component for collapsible panels
│   ├── ExternalLink.tsx           # Component to handle external links
│   ├── HapticTab.tsx              # Custom tab component with haptic feedback
│   ├── HelloWave.tsx              # Greeting component
│   ├── ParallaxScrollView.tsx     # Parallax scroll view component
│   ├── ThemedText.tsx             # Text component that supports themes
│   ├── ThemedView.tsx             # View component with theme support
│   └── ui
│       ├── IconSymbol.ios.tsx     # iOS-specific icon component
│       ├── IconSymbol.tsx         # Cross-platform icon component
│       ├── TabBarBackground.ios.tsx # iOS tab bar background component
│       └── TabBarBackground.tsx   # Tab bar background component for all platforms
├── constants
│   └── Colors.ts                  # Color constants for consistent theming
├── hooks
│   ├── useColorScheme.ts          # Hook for detecting device color scheme
│   ├── useColorScheme.web.ts      # Web-specific color scheme hook
│   └── useThemeColor.ts           # Hook to get theme-specific colors
├── scripts
│   └── reset-project.js           # Script to reset the project state
├── app.json                       # Expo app configuration file
├── expo-env.d.ts                  # Expo TypeScript environment definitions
├── package-lock.json              # Auto-generated npm dependency tree
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── frontend_structure.txt         # Text file outlining the project structure
```
# Setup

Follow these steps to set up the project locally:

- Clone the Repository:
```
git clone https://github.com/yourusername/frontendV2.git
cd frontendV2
```
- Install Dependencies: 
Make sure you have Node.js installed. Then run:
```
npm install
```
- Start the Development Server:
If you're using Expo for development, run:
```
npm run start
```
This will launch the Expo development server. Follow the on-screen instructions to open the app on your device or emulator.

# Features

### Expo Router for Navigation:
- Utilizes Expo Router for seamless page navigation.
- Automatic routing is set up based on the file structure in the app directory.

### Automatic Generated Organization Code:
- Generates a unique organization code in the `campaignCode.tsx` file.
- This code allows users from the same organization to access an analytics dashboard.

### Registration and Authentication:
- Registration and login screens (`signup.tsx`, `signinScreen.tsx`, `login.tsx`) are available for new and existing users.
- Implements authentication mechanisms to secure user data.

### Payment Details & Collection:
- Integrated payment processing screen (`paymentScreen.tsx`) to handle transactions.
- Supports multiple payment methods as evidenced by the payment icons in the assets folder.

### User Profile & Editing:
- Features dedicated screens for user profiles (`donorProfile.tsx`, `profileDetails.tsx`).
- Provides functionality for users to edit their profile information.

# Challenges

### Routing & Navigation:
- Implementing a robust router solution for page navigation was challenging. Managing dynamic routes and nested layouts required careful planning and debugging.

The project leverages Expo Router for seamless navigation. For instance, you can import and use the `useRouter` hook from the `expo-router` package as shown below:

```tsx
import { useRouter } from "expo-router";

const MyComponent = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/homeScreen");
  };

  return (
    <div>
      <button onClick={navigateToHome}>Go to Home</button>
    </div>
  );
};

export default MyComponent;
```
# Dependecies
The project is managed using npm. Some key dependencies include:

- React & React Native: For building the user interface.
- Expo: For streamlined cross-platform development.
- TypeScript: Provides static typing for improved code quality.

## ** Expo Installation**
1. Navigate to the project folder:

- cd fundu-app

2. Install dependencies:

- npm install

3. Create a new Expo app:

- npx create-expo-app@latest

4. Install the following dependencies:
```
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```
5. Run the project (for Expo):
```
- npx expo start
```

The following packages are used in this project:

### Expo:

- create-expo-app@latest
- React Navigation:
 - @react-navigation/native
 - @react-navigation/stack

### React Native packages:

- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler
- react-native-reanimated
- react-native-vector-icons
- 
Install all dependencies with:
```
npm install
```
# License
This project is licensed under the All Rights ReservedLicense.
