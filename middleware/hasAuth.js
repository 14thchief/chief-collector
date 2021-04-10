let createError = require('http-errors')

module.exports.isLoggedIn = function(req, res, next){
    if (req.user){
        next()
    }else {
        next(createError(404, "Page does not exist."))
    }
}


module.exports.hasAuth = function(req,res, next){
    if(req.user && req.user.is_admin == true){
        next()
    }
    else{
        next(createError(404, 'Page does not exist'))
    }
}