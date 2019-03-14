const db = require('../model/db');

module.exports.getIndex = (req, res) => {
  res.render('pages/index', {
    products: db.get('products').value(),
    skills: db.get('skills').value()
  });
};

module.exports.postIndex = (req, res) => {
  console.log('req!', req);
  return;
};