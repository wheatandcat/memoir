module.exports = {
  extends: '@react-native-community',
  env: {
    jest: true,
  },
  rules: {
    curly: 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
  },

  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
};
