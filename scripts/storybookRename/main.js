const fs = require('fs');
const path = require('path');

const dirPath = 'src/components';

const traverseDirectory = (dir, callback) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.resolve(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
};

traverseDirectory(dirPath, (filePath) => {
  const dirname = path.dirname(filePath);
  const basename = path.basename(filePath);

  if (basename === 'stories.tsx') {
    const newBasename = `${path.basename(dirname)}.${basename}`;
    const newPath = path.resolve(dirname, newBasename);

    fs.renameSync(filePath, newPath);

    console.log(`Renamed: ${filePath} --> ${newPath}`);
  }
});
