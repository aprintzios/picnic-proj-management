var express = require('express');
var router = express.Router();

const req = require('express/lib/request');
const passport = require('passport');

var usersCtrl = require('../controllers/usersCtrl');


router.get('/populate', usersCtrl.populateDB);

module.exports = router;
