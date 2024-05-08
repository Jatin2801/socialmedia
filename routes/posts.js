const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_conto')

router.post('/create' , postController.create)

module.exports = router; // this will be required in index file in routes folder