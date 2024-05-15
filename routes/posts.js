const express = require('express');
const router = express.Router();
const passport = require('passport')

const postController = require('../controllers/posts_conto')

router.post('/create' , passport.checkAuthentication  ,postController.create) // checkAuthentication is create in config pass-local-stra
//checkAuthentication is middleware here 

router.get('/destroy/:id',passport.checkAuthentication , postController.destroy) // :id is id of user here 

module.exports = router; // this will be required in index file in routes folder
//bcz of checkAuthentication anyone cannot edit html and create post via inspect