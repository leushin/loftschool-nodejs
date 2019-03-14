const db = require('../model/db');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const setSkills = (req, res, next) => {
  db.get('skills').value().forEach(item => {
    item.number = req.body[item.type];
  });
  db.write();
};

const setUpload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public', 'assets', 'img/products');
  
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  
  form.uploadDir = path.join(process.cwd(), upload);
  
  form.parse(req, (err, fields, files) => {
    console.log('parse', fields);
    if (err) {
      return next(err);
    }

    const fileName = path.join(upload, files.photo.name);
    
    fs.rename(files.photo.path, fileName, err => {
      if (err) {
        return next(err);
      }
      db.get('products')
        .push({
          "src": path.join(upload.replace('public', '.'), files.photo.name),
          "name": fields.name,
          "price": +fields.price
        })
        .write();
    });
  });
};

module.exports.getAdmin = (req, res) => {
  res.render('pages/admin');
};

module.exports.isAdmin = (req, res, next) => {
  !req.session.isAuth ? res.redirect('/login') : next();
};

module.exports.postAdmin = (req, res, next) => {
  switch (req.params.info) {
  case 'skills':
    setSkills(req, res, next);
    break;
  case 'upload':
    setUpload(req, res, next);
    break;
  }
  res.redirect('/admin');
};
