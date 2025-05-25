// Use Sentry’s Metro config wrapper (includes debug‑ID injection for sourcemaps)
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// Initialize Metro config via Sentry helper instead of Expo default
const config = getSentryExpoConfig(__dirname);

// -----------------------------------------------------------------------------
// Firebase / Expo SDK 53: allow “.cjs” files and use classic Node “exports”
// resolution so Firebase sub‑packages are bundled correctly.
// -----------------------------------------------------------------------------
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}

// Disable the new, stricter “package.json exports” resolution until every
// dependency (Firebase, React‑Native‑WebView, etc.) ships full export maps.
config.resolver.unstable_enablePackageExports = false;

// -----------------------------------------------------------------------------
// That’s it – export the tweaked config.
// -----------------------------------------------------------------------------
module.exports = config;
