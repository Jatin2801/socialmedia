const Post = require('../models/post')

module.exports.home = function(req, res){
   // console.log(req.cookies);// we added cookie named user_id from appli. in inspect and console logged it here 
   // res.cookie('user_id', 25); // changing cookie value 

//populate the user look for it in mongoose doc.
   Post.find({})
   .populate('user')
   .populate({
    path: 'comments',
    populate:{
        path:'user'
    }
   }// like this we can populate more than one 
   )
   .exec() //When you use an empty projection (like {}), it means you want to retrieve all fields except those explicitly excluded.
   .then((posts) => { // populate user will give all pro. of user and we access only name in home.ejs
       // Handle successful query here
       return res.render('home', { // home.ejs is rendered here
           title: 'Home',
           posts: posts
       });
   })
   .catch((err) => {
       console.error('Error fetching posts:', err);
       // Handle the error appropriately (e.g., send an error response)
   });
}

//module.exports.action_name = function(req,res){} and can be accessed in route to perform diff things