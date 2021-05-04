module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: '「コンポーネントの名前」は何ですか? 例: Page',
      },
      {
        type: 'select',
        name: 'atomic',
        choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
      },
      {
        type: 'input',
        name: 'dir',
        message:
          '「ディレクトリ名」を指定してください。 (無ければ、空欄でも大丈夫です) 例: src/components/Atomic/ディレクトリ名/コンポーネント名/',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { component_name, atomic, dir } = answers;
      const path = `/${atomic}/${dir}`;
      const absPath = `src/components${path}`;
      const testName = `components${path}/${component_name}`;
      const navigationName = component_name.replace('/', '');
      return { ...answers, path, absPath, testName, navigationName };
    });
  },
};
