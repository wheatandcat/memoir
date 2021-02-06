module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            lib: './src/lib',
            config: './src/config',
            storyBookUtils: './src/storyBookUtils',
          },
        },
      ],
    ],
  };
};
