
let models = require('../models/index');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let bcrypt = require('bcrypt');
let flash = require('connect-flash');

module.exports.show_login = function(req, res, next) {
   return res.render('user/login', { formData: {}, errors: {} });
}


module.exports.show_signup = function(req, res, next) {
   return res.render('user/signup', { formData: {}, error: {} });
}


const generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

module.exports.signup = function(req, res, next) {
   const newUser = models.User.build({
      email: req.body.email,
      password: generateHash(req.body.password)
   });
   return newUser.save().then(result => {
      passport.authenticate('local', {
         successRedirect: "/",
         failureRedirect: "/signup",
         failureFlash: true
      })(req,res,next);
   })
}


module.exports.login = function(req, res, next) {
   return passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
   })(req,res,next);
}

module.exports.logout = function(req, res, next) {
   req.logout();
   req.session.destroy();
   res.redirect('/');
}