module.exports = {
  configurations: {
    'ios.iphone11': {
      target: 'ios.simulator',
    },
  },
  fileNameFormatter: ({ configurationName, kind, story }) =>
    `${configurationName}/${kind}/${story}`,
};
