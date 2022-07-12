const express = require('express');
const {
  postLogin,
  getUserInformation,
  patchUserInformation,
  patchProfile,
} = require('../controllers/user.controller');
const { verifyToken, isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', verifyToken, postLogin);
router.get('/user-information', isLoggedIn, getUserInformation);
router.post('/new-information/beacon', isLoggedIn, patchUserInformation);
router.patch('/new-information', isLoggedIn, patchUserInformation);
router.patch('/profile', isLoggedIn, patchProfile);

module.exports = router;
