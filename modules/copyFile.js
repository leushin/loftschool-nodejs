const fs = require('fs');
const path = require('path');
const { config } = require('../index');

const copyFile = (base, item) => {
  let outputDirPath = path.join(__dirname, '../', config.output, item[0]);

  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath);
  }

  fs.copyFileSync(path.join(__dirname, '../', base, item), path.join(outputDirPath, item));
  console.log(`Файл ${item} скопирован!`);
};

module.exports = copyFile;
