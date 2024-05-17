const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
router.post('/update/:id',passport.checkAuthentication ,usersController.update); //get bcz we are updating the data 

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn); // when /sign-in is given in url usersController.signIn) will be called

router.post('/create', usersController.create); // will be called when sign up btn is clicked 

router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) ,  usersController.createSession) // use passport as middleware to auth.

router.get('/sign-out' , usersController.destroySession) 

module.exports = router; 