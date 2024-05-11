const express = require('express');
const router = express.Router();
const passport = require('passport')

const commentsController = require('../controllers/comments_contro')

router.post('/create' , passport.checkAuthentication  ,commentsController.create) // create is called form comments contro
//checkAuthentication is middleware here 
module.exports = router; // this will be required in index file in routes folder
//bcz of checkAuthentication anyone cannot edit html and create post via inspect