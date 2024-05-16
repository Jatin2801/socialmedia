const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = function(req, res){
   // console.log(req.cookies);// we added cookie named user_id from appli. in inspect and console logged it here 
   // res.cookie('user_id', 25); // changing cookie value 

//populate the user look for it in mongoose doc.
   Post.find({})
   .populate('user')
   .populate({
    path: 'comments',
    populate:{
        path:'user' // populate user will give all pro. of user and we access only name in home.ejs
    }
   }// like this we can populate more than one 
   )
   .exec() //When you use an empty projection (like {}), it means you want to retrieve all fields except those explicitly excluded.
   .then((posts) => { 
       // Handle successful query here
       User.find({})
       .then(users => {
           return res.render('home', { // home.ejs is rendered here
               title: "Codeial | Home",
               posts: posts,
               all_users: users //all users are made available by this
           });
       })
       .catch(err => {
           // Handle error fetching users
           console.error("Error fetching users:", err);
           // Send an appropriate response to the client
           res.status(500).send("Internal server error");
       });
   })
   .catch((err) => {
       console.error('Error fetching posts:', err);
       // Handle the error appropriately (e.g., send an error response)
   });
}

//module.exports.action_name = function(req,res){} and can be accessed in route to perform diff things