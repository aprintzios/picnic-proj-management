var express = require('express');
var router = express.Router();

// const req = require('express/lib/request');
// const passport = require('passport');

var profileCtrl = require('../controllers/profileCtrl');

router.get('/:id/edit', profileCtrl.editProfile);
router.put('/:id', profileCtrl.updateProfile);


module.exports = router;
