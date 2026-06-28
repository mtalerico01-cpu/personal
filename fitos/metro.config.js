// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Required for @shopify/react-native-skia on web (canvaskit-wasm)
config.resolver.assetExts.push('wasm');

// Stub out the Skia native JSI module on web — it's not needed because
// Skia on web uses canvaskit-wasm, not the native TurboModule.
const originalResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName.includes('NativeSkiaModule')) {
    return { type: 'empty' };
  }
  if (originalResolve) return originalResolve(context, moduleName, platform);
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
