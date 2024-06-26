const mongoose = require('mongoose') // to connect it to DB

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, // ObjectId is in studio 3T
        ref : 'User' // refering to User Schema
    },
    // include the array of ids of all comments in this post schema itself
    comments : [ // to make comm. appear faster we fetch them with posts itself 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
    },{
        timestamps: true
});

const Post = mongoose.model('Post' , postSchema)
module.exports = Post; // we will be creating posts in home page (home.ejs)