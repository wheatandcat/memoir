module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
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
            queries: './src/queries',
          },
        },
      ],
    ],
  };
};
