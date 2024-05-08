const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, // ObjectId is in studio 3T
        ref : 'User' // refering to User Schema
    }
    },
    {
        timestamps: true
});

const Post = mongoose.model('Post' , postSchema)
module.exports = Post; // we will be creating posts in home page (home.ejs)