module.exports.setFlash = function(req,res,next){ // this will be accessed in index.js
    res.locals.flash = {
        'success' : req.flash('success'),// if sucess is passed in flash
        'error' : req.flash('error') //if error is passed in flash
    }
    next();
}