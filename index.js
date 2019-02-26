const fs = require('fs');
const path = require('path');

let inputData = [];
const argv = process.argv.slice(2);

const config = {
  input: argv[0] || './pictures',
  output: argv[1] || './result',
  delete: argv[2] || false
};

const readDir = (base) => {
  const files = fs.readdirSync(base);

  files.forEach((item) => {
    let localBase = path.join(base, item);
    let stat = fs.statSync(localBase);

    stat.isDirectory() ? readDir(localBase) : inputData.push({ name: item, path: path.normalize(localBase) });
  });
};

const removeDir = (base) => {
  const files = fs.readdirSync(base);

  files.forEach((item) => {
    let localBase = path.join(base, item);
    let stat = fs.statSync(localBase);

    stat.isDirectory() ? removeDir(localBase) : fs.unlinkSync(localBase);
  });
  fs.rmdirSync(base);
};

readDir(config.input);

inputData = inputData.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});

if (inputData.length) {
  if (fs.existsSync(config.output)) {
    removeDir(config.output);
  }

  fs.mkdir(config.output, (err) => {
    if (err) throw err;
    let alpha = '';

    inputData.forEach((item) => {
      if (item.name[0] !== alpha) {
        alpha = item.name[0];
        fs.mkdirSync(path.join(config.output, alpha));
      }
      fs.copyFileSync(path.join(__dirname, item.path), path.join(__dirname, config.output, alpha, item.name));
    });
  });
  console.log('Данные успешно перенесены');
} else {
  console.log('Исходные файлы не найдены');
  process.exit(1);
}

process.on('exit', (code) => {
  if (code === 0 && config.delete) {
    removeDir(config.input);
  }
});
