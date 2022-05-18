var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const passport = require('passport');
// const Project = require('../models/project');
// const Task = require('../models/task');

var indexCtrl = require('../controllers/indexCtrl');


/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('landing');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
  }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/dashboard',
    failureRedirect : '/landing'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', indexCtrl.showDashboard);


function sRedirect(){
  if (req.isAuthenticated()) return '/users';
  return '/users/new'

}

router.get('/testAPI', function (req, res, next) {
  console.log('test api req ', req);
  let testData = ['one', 'two', 'three'];
  res.json(testData);
});

router.get('/testCSS', function (req, res, next) {
  res.render('testCSS.ejs');
});

module.exports = router;
