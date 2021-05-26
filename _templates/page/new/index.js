module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'ページを作成する「ディレクトリ名」を指定してください。',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { component_name } = answers;
      const path = `pages/${component_name}`;
      const navigationName = component_name.replace('/', '');
      const absPath = `src/components/${path}`;
      const storiesPath = `templates/${component_name}`;
      const templatePath = `src/components/templates/${component_name}`;
      const templateImportPath = `components/templates/${component_name}`;
      return {
        ...answers,
        path,
        navigationName,
        absPath,
        templatePath,
        templateImportPath,
        storiesPath,
        componentName: component_name,
      };
    });
  },
};
