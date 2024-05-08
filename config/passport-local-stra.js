const passport = require('passport')
 
const LocalStrategy = require('passport-local')

const User = require('../models/user')

//auth. using passport 
passport.use(new LocalStrategy({  // telling passport to use local strategy
    usernameField: 'email'
},
function (email , password , done) {
    // find a user and establish the identity 
    User.findOne({email: email})
        .then(user => {
            if (!user || user.password != password) {
                console.log('Invalid Username/password');
                return done(null, false);
            }
            return done(null, user); //when user found 
        })
        .catch(err => {
            console.log('Error in finding user -> passport');
            return done(err);
        });
}));


//serialiazing the user to decide which key is to be kept in cookies 
passport.serializeUser(function(user,done){
    done(null,user.id)
})

//deserializing the user from the key in cookies 
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user');
            return done(err);
        });
});

// check if user is authenticated

passport.checkAuthentication = function(req, res , next) { // this is a middleware which will be used in routes 
   //if the user is signed in , then pass on the request to the next func.(controller's) action
   if(req.isAuthenticated()){ //passport tells if auth. or not, isAuthenticated is its func.
    return next()
   } 
   // if user not signed in 
   return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req, res , next) {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport // we are not expo. strategy but just passport