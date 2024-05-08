const Post = require('../models/post')

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((post) => {
        // Handle successful post creation here
        return res.redirect('back');
    })
    .catch((err) => {
        console.log('Error in creating post:', err);
        // Handle the error appropriately (e.g., send an error response)
    });
    
}