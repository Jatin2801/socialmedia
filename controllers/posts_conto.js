const Post = require('../models/post')
const Comment = require('../models/comment')

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


module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                throw new Error('Post not found');
            }
            if (post.user.toString() !== req.user.id) {
                throw new Error("Unauthorized access");
            }
            return Post.deleteOne({ _id: post._id });  // Using deleteOne instead of remove(no longer supported)
        })
        .then(() => {
            // Proceed to delete all comments associated with the post
            return Comment.deleteMany({ post: req.params.id });
        })
        .then(() => {
            res.redirect('back');
        })
        .catch((err) => {
            console.error('Error:', err.message);
            res.status(500).send(err.message);
        });
};
