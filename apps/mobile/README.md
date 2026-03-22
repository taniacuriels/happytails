# Mobile App

HappyTails mobile app built with vanilla React Native for fosters, adopters, and on-call staff.

## Features

- Push notifications
- Inbox and conversations
- Animal timelines
- Quick actions
- Status updates
- Document attachments

## Tech Stack

- **React Native** - Mobile framework (vanilla, no Expo)
- **TypeScript** - Type safety
- **Metro** - Bundler
- **React Navigation** - Routing (to be added)

## Development

### Prerequisites

- Node.js 18+
- React Native development environment
- Xcode (for iOS development on macOS)
- Android Studio (for Android development)

### Setup

```bash
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start
```

### Running on Device/Simulator

```bash
# iOS
npm run ios

# Android
npm run android
```

## Building for Production

### iOS
Open `ios/HappyTails.xcworkspace` in Xcode and build/archive from there.

### Android
```bash
cd android
./gradlew assembleRelease
```

## Project Structure

```
mobile/
├── src/                    # React Native source code
│   └── App.tsx            # Main app component
├── android/               # Android native code
├── ios/                   # iOS native code
├── index.js               # Entry point
├── metro.config.js        # Metro bundler config
├── babel.config.js        # Babel configuration
└── tsconfig.json          # TypeScript configuration
```

## Notes

This is a vanilla React Native project (not using Expo). You'll need to set up your development environment according to the [React Native documentation](https://reactnative.dev/docs/environment-setup).
