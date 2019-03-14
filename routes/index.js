const express = require('express');
const router = express.Router();

const { getIndex, postIndex } = require('../controllers/index');
const { getLogin, isLogin, postLogin } = require('../controllers/login');
const { getAdmin, isAdmin, postAdmin } = require('../controllers/admin');

router.get('/', getIndex);
router.get('/login', isLogin, getLogin);
router.get('/admin', isAdmin, getAdmin);

router.post('/', postIndex);
router.post('/login', postLogin);
router.post('/admin/:info', postAdmin);

module.exports = router;