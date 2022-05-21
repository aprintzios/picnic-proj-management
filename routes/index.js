var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const passport = require('passport');
const Project = require('../models/project');
const Task = require('../models/task');

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
    successRedirect: '/dashboard',
    failureRedirect: '/landing'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', indexCtrl.showDashboard);


function sRedirect() {
  if (req.isAuthenticated()) return '/users';
  return '/users/new'

}

// router.get('/testAPI', function (req, res, next) {
//   console.log('test api req body', req.body);
//   let testData = ['one', 'two', 'three'];
//   res.json(testData);
// });

router.post('/testAPI', async function (req, res, next) {
  console.log('test api req body', req.body);
  let projects = req.body.paramArray;
  let filteredTasks = [];
  if (projects) {
    for (let i = 0; i < projects.length; i++) {
      filteredTasks.push(await Task.find({ project: projects[i] }));
    }
  } else {
    //return all tasks
  }
  res.json(filteredTasks);
});


router.post('/dashFilter', async function (req, res, next) {
  let projects = req.body.projects;
  let status = req.body.status;
  let user = req.user;
  let filteredTasks = [];
  if (user) {
    if (projects.length>0 && status.length>0) {
      for (let i = 0; i < projects.length; i++) {
        let tasks;
        for (j=0; j<status.length; j++){
          tasks = await Task.find({ project: projects[i], assignedTo: user, status : status[j] });
            for (let k=0; k<tasks.length; k++){
              await tasks[k].populate('project');
              filteredTasks.push(tasks[k]);
            }
        }
      }
    } else if (projects.length>0){
      for (let i = 0; i < projects.length; i++) {
        let tasks;
          tasks = await Task.find({ project: projects[i], assignedTo: user });
            for (let k=0; k<tasks.length; k++){
              await tasks[k].populate('project');
              filteredTasks.push(tasks[k]);
            }
        }
      } else if (status.length>0) {
        for (let i = 0; i < status.length; i++) {
          let tasks;
            tasks = await Task.find({ status: status[i], assignedTo: user });
              for (let k=0; k<tasks.length; k++){
                await tasks[k].populate('project');
                filteredTasks.push(tasks[k]);
              }
          }
    } else {
      //return all 
      filteredTasks =  await Task.find({ assignedTo: user });
      for (let i=0; i<filteredTasks.length; i++){
        await filteredTasks[i].populate('project');
      }
    }
  }
    res.json(filteredTasks);

});

router.get('/testCSS', function (req, res, next) {
  res.render('testCSS.ejs');
});

module.exports = router;
