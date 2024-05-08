module.exports.home = function(req, res){
   // console.log(req.cookies);// we added cookie named user_id from appli. in inspect and console logged it here 
   // res.cookie('user_id', 25); // changing cookie value 
    return res.render('home', { // home ejs file is rendered here 
        title: "Home"
    });
}

//module.exports.action_name = function(req,res){} and can be accessed in route to perform diff things