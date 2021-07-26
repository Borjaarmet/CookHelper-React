const express = require('express');

const { checkUsernameAndPasswordNotEmpty } = require('../middlewares');
const { getWhoAmI, getUserSignup, getUserLogin, getUserLogout } = require('../controllers/auth');

const router = express.Router();

router.get('/whoami', getWhoAmI);
router.post('/signup', checkUsernameAndPasswordNotEmpty, getUserSignup);
router.post('/login', checkUsernameAndPasswordNotEmpty, getUserLogin);
router.get('/logout', getUserLogout);
// router.put('/')

module.exports = router;
