// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fixes for Rainbow charts and Reanimated v2
config.resolver.sourceExts.push('cjs');

module.exports = config;