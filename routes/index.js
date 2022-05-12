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
  //await req.user.populate('projects');
  //get all the projects that this user is a group member of
  //get all projects, loop through all projects, loop group members compare

  let userProjects = await Project.find({ groupMembers: { "$in" : [req.user._id]} });
  //get all tasks assigned to user
  //loop through all projects of user
  //await Project.find
  let userTasks = [];

  for (let i=0; i<userProjects.length; i++){
    for (let j=0; j<userProjects[i].tasks.length; j++){
      if (userProjects[i].tasks[j].assignedTo._id == req.user.id){
        userTasks.push(userProjects[i].tasks[j]);
      }
    }
  }

  console.log("user projects", userProjects);
  console.log("user tasks", userTasks);
  res.render('dashboard', { 
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

module.exports = router;
