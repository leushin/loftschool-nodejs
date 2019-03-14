const db = require('../model/db');

const { email, pass } = db.getState().users.admin;

module.exports.isLogin = (req, res, next) => {
  req.session.isAuth ? res.redirect('/admin') : next();
};

module.exports.getLogin = (req, res) => {
  res.render('pages/login');
};

module.exports.postLogin = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.render('pages/login', { msgslogin: 'Одно или несколько полей не заполнены!' });
  }
  if (req.body.email === email && req.body.password === pass) {
    req.session.isAuth = true;
    return res.redirect('/admin');
  }
  return res.render('pages/login', { msgslogin: 'Ошибка авторизации' });
};