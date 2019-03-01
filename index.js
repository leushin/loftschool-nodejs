const express = require('express');

const app = express();
const argv = process.argv.slice(2);

const config = {
  delay: argv[0] || 1000,
  stop: argv[1] || 10000
};

if (!isFinite(config.delay) || !isFinite(config.stop)) {
  console.error('Переменные окружения должны быть числами!');
  process.exit(1);
}

app.get('/', (req, res) => {
  const timerId = setInterval(() => {
    console.log(new Date().toUTCString());
  }, config.delay);

  setTimeout(() => {
    clearInterval(timerId);
    res.send(new Date().toUTCString());
  }, config.stop);
}).listen(3000);
