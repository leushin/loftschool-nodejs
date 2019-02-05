const fs = require('fs');
const path = require('path');
const files = [];

const getFiles = (dir) => {
    fs.readdir(dir, (err, items) => {
        items.forEach(item => {
            const itemPath = path.join(dir, item);
            fs.stat(itemPath, (err, stats) => {
                stats.isDirectory() ? getFiles(itemPath) : files.push({ item, itemPath });
            });
        });
    });
};

getFiles('pictures');