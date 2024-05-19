const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
     // Handle successful post creation here
        return res.redirect('back');
    }
    catch(err){
        console.log('Error', err); // Handle the error appropriately (e.g., send an error response)
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.user.toString() !== req.user.id) {
            throw new Error('Unauthorized access');
        }

        // Using deleteOne instead of remove (no longer supported)
        await Post.deleteOne({ _id: post._id });

        // Proceed to delete all comments associated with the post
        await Comment.deleteMany({ post: req.params.id });

        res.redirect('back');
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send(err.message);
    }
};
