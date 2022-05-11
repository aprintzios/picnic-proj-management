var express = require('express');
var router = express.Router();

const req = require('express/lib/request');
const passport = require('passport');

var projectCtrl = require('../controllers/projectCtrl');

/* GET project listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { 
    user: req.user,
  });
});

router.post('/', projectCtrl.newProject);

router.get('/new', function(req, res){
  res.render('project-new');
});

router.get('/:id', projectCtrl.showProject);

router.post('/:id/task', projectCtrl.addTask);

router.get('/:id/task/:taskId', projectCtrl.showTask);

router.put('/:id/task/:taskId', projectCtrl.editTask);

router.delete('/:id/task/:taskId/destroy', projectCtrl.deleteTask);

router.get('/:id/new-member', projectCtrl.newMember);

router.post('/:id/addMember', projectCtrl.addMember);

router.delete('/:id/member/:memberId/destroy', projectCtrl.deleteMember);

module.exports = router;
