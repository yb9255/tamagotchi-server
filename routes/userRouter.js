const express = require('express');
const { postLogin } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', verifyToken, postLogin);

module.exports = router;
