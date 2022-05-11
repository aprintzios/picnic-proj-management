var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const passport = require('passport');
const Project = require('../models/project');


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

router.get('/dashboard', async function (req, res, next) {
  console.log("req user", req.user);
  if (req.user){
  //populate user projects
  await req.user.populate('projects');
  //get all tasks assigned to user
  //loop through all projects of user
  //await Project.find
  res.render('dashboard', { 
    user: req.user,
  });
} else{
  res.redirect('/');
}

});

function sRedirect(){
  if (req.isAuthenticated()) return '/users';
  return '/users/new'

}

module.exports = router;
