const express = require('express');
const {
  postLogin,
  getUserInformation,
} = require('../controllers/user.controller');
const { verifyToken, isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', verifyToken, postLogin);
router.get('/userInformation', isLoggedIn, getUserInformation);

module.exports = router;
