const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const config = {
  input: argv[0] || './pictures',
  output: argv[1] || './result',
  delete: argv[2] || false
};

exports.config = config;

const walkDir = require('./modules/walkDir');
const copyFile = require('./modules/copyFile');

if (fs.existsSync(config.output)) {
  walkDir(config.output, (base, item) => fs.unlinkSync(path.join(base, item)), base => fs.rmdirSync(base));
  console.log(`Старая папка ${config.output} удалена!`);
}

fs.mkdir(config.output, (err) => {
  if (err) throw err;
  console.log(`Новая папка ${config.output} создана!`);
  walkDir(config.input, (base, item) => copyFile(base, item), base => config.delete && fs.rmdirSync(base));
});
