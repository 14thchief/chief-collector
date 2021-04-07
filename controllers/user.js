
module.exports.show_login = function(req, res, next) {
   return res.render('user/login', { formData: {}, errors: {} });
}


module.exports.show_signup = function(req, res, next) {
   return res.render('user/signup', { formData: {}, error: {} });
}

module.exports.login = function(req, res, next) {

}

module.exports.signup = function(req, res, next) {
   
}
