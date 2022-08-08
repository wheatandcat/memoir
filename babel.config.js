module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            lib: './src/lib',
            config: './src/config',
            storyBookUtils: './src/storyBookUtils',
            store: './src/store',
            hooks: './src/hooks',
            containers: './src/containers',
            queries: './src/queries',
            __mockData__: './src/__mockData__',
          },
        },
      ],
    ],
  };
};
