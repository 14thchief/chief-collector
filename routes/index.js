var express = require('express');
var router = express.Router();
var landing = require('../controllers/landing')
/* GET home page. */
router.get('/', landing.get_landing);
router.get('/leads', landing.show_leads);
router.post('/', landing.submit_lead);
module.exports = router;
