const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) { // if post is present
            const comment = await Comment.create({ // .create is a mongoose function 
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }); 
            post.comments.push(comment); // Push the new comment to the post's comments array
            await post.save(); // Save the updated post
            res.redirect('/'); // Redirect to the home page after successful comment creation
        }
    } catch (err) {
        console.error('Error creating comment:', err);
        // Handle error finding post or creating comment
    }
};

module.exports.destroy = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            const postId = comment.post;
            await comment.deleteOne();
            await Post.findByIdAndUpdate(req.params.id, { $pull: { comments: req.params.id } });
            return res.redirect('back');
        } else {
            throw new Error('Unauthorized');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

