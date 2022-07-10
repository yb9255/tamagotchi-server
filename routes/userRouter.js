const express = require('express');
const {
  postLogin,
  getUserInformation,
  patchUserInformation,
} = require('../controllers/user.controller');
const { verifyToken, isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', verifyToken, postLogin);
router.get('/user-information', isLoggedIn, getUserInformation);
router.patch('/new-information', isLoggedIn, patchUserInformation);

module.exports = router;
