var express = require('express');
var router = express.Router();
var landing = require('../controllers/landing');
let user = require('../controllers/user');
let isLoggedIn = require("../middleware/hasAuth").isLoggedIn
let hasAuth = require('../middleware/hasAuth').hasAuth
/* Signup and Login */

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.get('/adminsignup', user.show_adminsignup)
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/adminsignup', user.adminsignup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);
router.get('/users',hasAuth, user.show_users);
router.post('/user/:user_id/delete', hasAuth, user.delete_user);
/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/leads', hasAuth, landing.show_leads);
router.get('/lead/:lead_id', hasAuth, landing.show_lead);
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead);
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead);
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead);
router.post('/lead/:lead_id/delete-json', hasAuth, landing.delete_lead_json);

module.exports = router;
