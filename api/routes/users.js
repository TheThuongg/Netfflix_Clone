const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const authController = require('../controllers/UserController');

//[PUT] /users/update/:id
router.put('/:id', auth, authController.async);
//[DELETE] /users/delete/:id
router.delete('/:id', auth, authController.delete);
//[GET] /users/find/:id
router.get('/find/:id', authController.find);
// [GET] /users/
router.get('/', auth, authController.getUsers);
// [GET] /users/stats
router.get('/stats', auth, authController.getUserStart);


module.exports = router;