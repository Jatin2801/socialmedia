const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => { // if post is present then proceed 
            if (post) {
                Comment.create({ // .create is a mongoose function 
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then(comment => {
                        post.comments.push(comment); // Push the new comment to the post's comments array // comments is name of array 
                        return post.save(); // Save the updated post
                    })
                    .then(() => {
                        res.redirect('/'); // Redirect to the home page after successful comment creation
                    })
                    .catch(err => {
                        console.error('Error creating comment:', err);
                    });
            }
        })
        .catch(err => {
            console.error('Error finding post:', err);
        });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id)
        .then(function (comment) {
            if (comment.user == req.user.id) {
                let postId = comment.post;
                return comment.deleteOne();
            } else {
                throw new Error('Unauthorized');
            }
        })
        .then(function () {
            return Post.findByIdAndUpdate(req.params.id, { $pull: { comments: req.params.id } });//we're finding a post by its ID and updating it. So, postId is the ID of the post we want to update.
        })
        .then(function () {
            return res.redirect('back');
        })
        .catch(function (err) {
            console.error(err);
            return res.redirect('back');
        });
};
