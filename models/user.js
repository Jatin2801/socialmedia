const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('/uploads/users/avatars'); // Location where avatar files will be uploaded

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: { // Fields defined in the schema will be shown in the DB in Studio 3T
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // cb is callback function
        cb(null, path.join(__dirname, '..', AVATAR_PATH)); // Path of file, '..' is for going back and AVATAR_PATH is uploads/users/avatars
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix); // fieldname is avatar here
    }
});

// Static Methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar'); // .single means only one file will be uploaded
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;
