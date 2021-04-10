
let models = require('../models/index');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let bcrypt = require('bcrypt');
let flash = require('connect-flash');


const validateUserSignup = require('../validators/signup').validateUser
const validateUserLogin = require('../validators/login').validateUser
const { isEmpty } = require('lodash');





module.exports.show_login = function(req, res, next) {
   return res.render('user/login', { formData: {}, errors: {} });
}

//show normal signup
module.exports.show_signup = function(req, res, next) {
   return res.render('user/signup', { formData: {}, errors: {} });
}

//show admin signup
module.exports.show_adminsignup = function(req, res, next) {
   return res.render('user/adminsignup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
   return res.render('user/signup', { formData: req.body, errors: errors });
}

const rerender_adminsignup = function(errors, req, res, next) {
   return res.render('user/adminsignup', { formData: req.body, errors: errors });
}

const rerender_login = function(errors, req, res, next) {
   return res.render('user/login', { formData: req.body, errors: errors });
}


const generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


//signup handler  
module.exports.signup = function(req, res, next) {
   let errors = {};
   return validateUserSignup(errors, req).then(errors=> {
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
};

//Admin signup handler
module.exports.adminsignup = function(req, res, next) {
   let errors = {};
   return validateUserSignup(errors, req).then(errors=> {
      if(!isEmpty(errors)) {
         rerender_adminsignup(errors, req, res, next);
      }
      else{
         return models.User.findAll({
            where: {
               is_admin: true
            }
         }).then(user => {
            let newUser;
               newUser = models.User.build({
                  email: req.body.email.toLowerCase(),
                  password: generateHash(req.body.password),
                  is_admin: true
               });
            return newUser.save().then(result => {
               passport.authenticate('local', {
                  successRedirect: "/",
                  failureRedirect: "/adminsignup",
                  failureFlash: true
               })(req,res,next);
            })
        
         })
      }
   })
   
}


module.exports.login = function(req, res, next) {
   let errors = {};
   return validateUserLogin(errors, req).then(errors=> {
      if(!isEmpty(errors)) {
         rerender_login(errors, req, res, next);
      }
      else{
         return passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
         })(req,res,next);
      }
   })
}

module.exports.logout = function(req, res, next) {
   req.logout();
   req.session.destroy();
   res.redirect('/');
}

exports.show_users = function(req, res, next) {
   return models.User.findAll().then(users => {
     res.render('user/users', { users: users, user: req.user });
   })
 };

 exports.delete_user = function(req, res, next) {
   return models.User.destroy({
     where : {
         id : req.params.user_id
     }
   }).then(result => {
         res.redirect('/users')
   })
 };