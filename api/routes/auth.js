const router = require("express").Router();


const authController = require('../controllers/UserController');

//[POST]api/auth/register
router.post('/register',authController.register);
router.post('/login',authController.login);

module.exports = router;
