const analyzeTsConfig = require('ts-unused-exports').default;
const config = require('./config.json');
const rootPath = require('path').resolve();

const result = analyzeTsConfig('./tsconfig.json');

var red = '\u001b[31m';
var green = '\u001b[32m';
var white = '\u001b[37m';
var yellow = '\u001b[33m';

const keys = Object.keys(result);
const ignoreFiles = config.ignoreFiles;
const baseUrl = config.baseUrl;

let items = [];

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];

  if (!key.startsWith(`${rootPath}/${baseUrl}`)) {
    continue;
  }

  const ignore = ignoreFiles.find((v) => {
    const path = key.replace(`${rootPath}/`, '');
    const regexp = new RegExp(v + '(.*?)', 'g');

    return regexp.test(path);
  });

  if (ignore) {
    continue;
  }

  const item = result[key];
  const exportName = item.map((v) => v.exportName).join(', ');

  items.push({
    path: key,
    text: white + key.replace(`${rootPath}/`, '') + ': ' + yellow + exportName,
  });
}

if (items.length === 0) {
  console.log(green + '0 modules with unused exports');
} else {
  console.log(red + `${items.length} modules with unused exports`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    console.log(item.text);
  }

  process.exit(1);
}
