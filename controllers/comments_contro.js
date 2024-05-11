const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (post) {
                Comment.create({
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