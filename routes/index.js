//routes given in index.js will come here 

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));// means in url after localhost:port if /users/profile comes <h1>User Profile</h1> will display
router.use('/posts' , require('./posts'))
router.use('/comments',require('./comments')) // requires comments.js from routes folder

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router; //used in other index.js file line 21