const fs = require('fs');
const path = require('path');
const util = require('util');
const files = [];

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const getFiles = async (dir, callback) => {
    const items = await readdir(dir);

    items.forEach(async item => {
        const itemPath = path.join(dir, item);
        const stats = await stat(itemPath);
        stats.isDirectory() ? getFiles(itemPath) : files.push({ item, itemPath });
    });
};

getFiles('pictures').then(() => {
    console.log(files);
});