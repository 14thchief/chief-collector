
let models = require('../models/index');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let bcrypt = require('bcrypt');
let flash = require('connect-flash');


const {  validateUser } = require('../validators/signup');
const { isEmpty } = require('lodash');





module.exports.show_login = function(req, res, next) {
   return res.render('user/login', { formData: {}, errors: {} });
}


module.exports.show_signup = function(req, res, next) {
   return res.render('user/signup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
   return res.render('user/signup', { formData: req.body, errors: errors });
}


const generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


//signup handler  
module.exports.signup = function(req, res, next) {
   let errors = {};
   return validateUser(errors, req).then(errors=> {
      if(!isEmpty(errors)) {
         rerender_signup(errors, req, res, next);
      }
      else{
         const newUser = models.User.build({
            email: req.body.email.toLowerCase(),
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