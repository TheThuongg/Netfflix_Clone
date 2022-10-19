const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const movieController = require('../controllers/MovieController');

// [POST] /api/movie/create
router.post('/', auth, movieController.create);
// [PUT] /api/movie/:id
router.put('/:id', auth, movieController.update);
// [DELETE] /api/movie/:id
router.delete('/:id', auth, movieController.delete);
// [GET] /api/movie/find/:id
router.get('/find/:id', auth, movieController.find);
// [GET]/ api/movie/random
router.get('/random', auth, movieController.random);
// [GET]/ api/movie/
router.get('/', auth, movieController.getAll);



module.exports = router;