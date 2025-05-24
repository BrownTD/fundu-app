// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fixes for Rainbow charts and Reanimated v2
config.resolver.sourceExts.push('cjs');
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = config;