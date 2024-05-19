const User = require('../models/user');

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id) // once user is found then conti.
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err)
    }
};

//Updating User Profile
module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) { // user thats logged in should be able to update only his profile
            let update = User.findByIdAndUpdate(req.params.id, req.body) //findByIdAndUpdate will update with the value of req.data
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error Occured', err)
    }
}

// render the sign up page
module.exports.signUp = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile') // if user is signed in he will not see sign-up page and redirect to profile page 
        }
        return res.render('user_sign_up', { // if not signed in render sign_up page 
            title: "Codeial | Sign Up"
        })
    } catch {
        console.log('Error Occured', err)
    }
}

//after every server restart session ends we need to fix this by mongo store(installed through npm install connect-mango)

// render the sign in page
module.exports.signIn = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile') // if user is signed in he will not see sign in page and redirect to profile page 
        }
        return res.render('user_sign_in', {
            title: "Codeial | Sign In"
        })
    } catch {
        console.log('Error Occured', err)
    }
}

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {// to check if paas and confirm_paas are same 
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email }) // user imported 1st line and fetched email here 
        if (!user) { //if user not found create it
            User.create(req.body) // creating user by fetching data from form into DB .create() is a mongoose func.
                .then(user => {
                    console.log('User created successfully');
                    return res.redirect('/users/sign-in');
                })
                .catch(err => {
                    console.log('error in creating user while signing up');
                    return res.redirect('back');
                });
        } else {
            return res.redirect('back');
        }
    }
    catch {
        console.log('Error Occured', err)
    }
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    //we need to install passport through npm and passport-local as its strategy through npm 
    return res.redirect('/')
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            // handle error here
            console.log(err);
            return res.status(500).send(err);
        }
        return res.redirect('/');
    });
}