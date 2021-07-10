module.exports = {
  extends: '@react-native-community',
  globals: {
    EdgesNode: true,
    PageInfo: true,
    ArrayType: true,
  },
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
  overrides: [
    {
      files: ['*.gql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      parserOptions: {
        operations: ['./src/**/*.gql'],
        schema: './schema.json',
      },
      rules: {
        'prettier/prettier': 0,
        '@graphql-eslint/require-id-when-available': [
          'error',
          {
            fieldName: 'id',
          },
        ],
        '@graphql-eslint/no-deprecated': 'error',
        '@graphql-eslint/no-unused-variables': 'error',
      },
    },
  ],
};
