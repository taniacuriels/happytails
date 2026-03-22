module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.json'],
        alias: {
          '@domain': '../../packages/domain/src',
          '@messaging': '../../packages/messaging/src',
          '@scheduling': '../../packages/scheduling/src',
          '@notifications': '../../packages/notifications/src',
          '@auth': '../../packages/auth/src',
          '@design-tokens': '../../packages/design-tokens/src',
        },
      },
    ],
  ],
};
