const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async function (req, res) {
    // console.log(req.cookies);// we added cookie named user_id from appli. in inspect and console logged it here 
    // res.cookie('user_id', 25); // changing cookie value 

    try {
        //populate the user look for it in mongoose doc.
        let posts = await Post.find({}) //here we used async await
            .populate('user')
            .populate({    //if this is completed then only users will get exe. 
                path: 'comments',
                populate: {
                    path: 'user' // populate user will give all pro. of user and we access only name in home.ejs
                }
            })// like this we can populate more than one 

        let users = await User.find({}) // this will carry out once Post.find() is carried out and result of User.find will store in let users 
        return res.render('home', { // home.ejs is rendered here
            title: "Codeial | Home",
            posts: posts, // let posts wala post is used here 
            all_users: users //all users are made available by this
        });
    }
    catch (err) {
 console.log('error occured' , err)
 return;
    }
}

//module.exports.action_name = function(req,res){} and can be accessed in route to perform diff things