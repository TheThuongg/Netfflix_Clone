const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const listController = require('../controllers/ListController');

// [POST] /api/movie/create
router.post('/', auth, listController.create);

// [DELETE] /api/movie/:id
router.delete('/:id', auth, listController.delete);


// [GET]/ api/movie/
router.get('/', auth, listController.getAll);



module.exports = router;