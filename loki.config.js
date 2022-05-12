module.exports = {
  configurations: {
    'ios.iphone11': {
      target: 'ios.simulator',
      preset: 'iPhone 11',
    },
    'ios.iphone8': {
      target: 'ios.simulator',
      preset: 'iPhone 8',
    },
  },
  fileNameFormatter: ({ configurationName, kind, story }) =>
    `${configurationName}/${kind}/${story}`,
};
