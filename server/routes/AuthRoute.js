const {Signup,Login} = require('../controllers/Authcontroller');
const {userVerification} = require('../Middlewares/Authmiddleware')
const router = require('express').Router();
router.post('/signup',Signup);
router.post('/login',Login);
router.post('/',userVerification);
module.exports = router;  