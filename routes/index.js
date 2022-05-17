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
  if (req.user){
  let userProjects = await Project.find({ groupMembers: { "$in" : [req.user._id]} });

  let userTasks = [];

  for (let i=0; i<userProjects.length; i++){
    for (let j=0; j<userProjects[i].tasks.length; j++){
      if (userProjects[i].tasks[j].assignedTo._id == req.user.id){
        userTasks.push(userProjects[i].tasks[j]);
      }
    }
  }

  res.render('dashboard2', { 
    user: req.user,
    userProjects,
    userTasks
  });
} else{
  res.redirect('/');
}
});


function sRedirect(){
  if (req.isAuthenticated()) return '/users';
  return '/users/new'

}

router.get('/testAPI', function (req, res, next) {
  let testData = ['one', 'two', 'three'];
  res.json(testData);
});

router.get('/testCSS', function (req, res, next) {
  res.render('testCSS.ejs');
});

module.exports = router;
