const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id); // Once user is found then continue
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err);
    }
};

// Updating User Profile
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) { // User that's logged in should be able to update only their profile
        try {
            User.uploadedAvatar(req, res, async function (err) {
                if (err) {
                    console.log('***Multer error', err);
                    return res.redirect('back');
                }

                let user = await User.findById(req.params.id); // Find the user by ID
                if (!user) {
                    console.log('User not found');
                    return res.redirect('back');
                }

                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;

                if (req.file) { // if a file is uploaded

                    if(user.avatar){ // if avatar is already present 
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename; // this is saving the avatar field in the user 
                    console.log('File uploaded successfully:', req.file);
                }

                await user.save();
                return res.redirect('back');
            });
        } catch (err) {
            console.log('Error Occurred', err);
            return res.redirect('back');
        }
    } else {
        return res.redirect('back');
    }
}

// Render the sign-up page
module.exports.signUp = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile'); // If user is signed in they will not see sign-up page and redirect to profile page
        }
        return res.render('user_sign_up', { // If not signed in, render sign-up page
            title: "Codeial | Sign Up"
        });
    } catch (err) {
        console.log('Error Occurred', err);
    }
}

// Render the sign-in page
module.exports.signIn = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile'); // If user is signed in they will not see sign-in page and redirect to profile page
        }
        return res.render('user_sign_in', {
            title: "Codeial | Sign In"
        });
    } catch (err) {
        console.log('Error Occurred', err);
    }
}

// Get the sign-up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) { // To check if password and confirm_password are the same
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email }); // User imported in the 1st line and fetched email here
        if (!user) { // If user not found, create it
            User.create(req.body) // Creating user by fetching data from form into DB .create() is a mongoose function
                .then(user => {
                    console.log('User created successfully');
                    return res.redirect('/users/sign-in');
                })
                .catch(err => {
                    console.log('Error in creating user while signing up', err);
                    return res.redirect('back');
                });
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error Occurred', err);
    }
}

// Sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In');
    return res.redirect('/');
};

// Destroy session to log out the user
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        req.flash('success', 'Logged Out!');
        if (err) {
            // Handle error here
            console.log(err);
            return res.status(500).send(err);
        }
        return res.redirect('/');
    });
};
