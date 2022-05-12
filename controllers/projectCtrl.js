const { model } = require('mongoose');
//const { findById } = require('../models/project');
let Project = require('../models/project');
let User = require('../models/user');

async function newProject(req, res) {
    var newProject = new Project({
        name: req.body.projectName,
        createdBy: req.user.id,
        groupMembers: [req.user.id],
        tasks: []
    });
    await newProject.save();
    //add current user to 
    //req.user.projects.push(newProject._id);
    //await req.user.save();
    res.redirect('/dashboard');
}

async function showProject(req, res) {
    let projectId = req.params.id;
    //get project
    let project = await Project.findById(projectId);
    //populate members
    await project.populate('groupMembers');
    await project.populate('tasks.assignedTo');

    //get Users
    let users = await User.find();
    let user = req.user;
    let userProjects = await Project.find({ groupMembers: { "$in" : [user._id]} });
    console.log("req user", req.user);
    res.render('project-show', { project, users, user, userProjects});
}

async function deleteProject(req, res){

}

async function addTask(req, res) {
    //get project id
    let projectId = req.params.id;
    //create new task
    let newTask = {
        name: req.body.taskName,
        assignedTo: req.body.assignedTo,
        due: req.body.dueDate,
        status: req.body.status
    }
    //get project 
    let project = await Project.findById(projectId);
    //push task to project
    project.tasks.push(newTask);
    //save
    await project.save();

    //redirect to /project/:id
    res.redirect('/projects/' + projectId);
}

async function showTask(req, res) {
    var task;
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    //get project
    let project = await Project.findById(projectId);
    await project.populate('groupMembers');
    //find task
    for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i]._id == taskId) {
            task = project.tasks[i];
        }
    }
    let users = await User.find();
    res.render('task-show', { project, task, users});
}


async function editTask(req, res) {
    let taskId = req.params.taskId;
    //get project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //get task 
    for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i]._id == taskId) {
            //edit the task
            project.tasks[i].name = req.body.taskName;
        }
    }
    //save project
    await project.save();
    res.redirect('/projects/' + projectId);
}

async function deleteTask(req, res) {
    console.log("in delete task");
    let taskId = req.params.taskId;
    //get project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //get task 
    for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i]._id == taskId) {
            //splice the task
            project.tasks.splice(i, 1);
        }
    }
    //save project
    await project.save();
    res.redirect('/projects/' + projectId);
}

async function newMember(req, res) {
    //get project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //populate groupMembers
    await project.populate('groupMembers');
    //get list of users
    let users = await User.find();
    res.render("project-add-member", { project, users });
}

async function addMember(req, res) {
    //get current project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //get user
    let userId = req.body.newMember;
    //push userId to project groupMember array
    project.groupMembers.push(userId);
    await project.save();
    res.redirect('/projects/'+projectId+'/new-member');
}

async function deleteMember(req, res){
    //get userId
    let userId = req.params.memberId;
    console.log("user id", userId);
    //get project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //populate groupMembers
    await project.populate('groupMembers');
    //remove groupMember from project
    for (let i=0; i<project.groupMembers.length; i++){
        if (project.groupMembers[i]._id.valueOf() === userId){
            project.groupMembers.splice(i,1);
        }
    }
    await project.save();
    res.redirect('/projects/'+projectId);
}

module.exports = {
    newProject,
    showProject,
    deleteProject,
    addTask,
    showTask,
    editTask,
    deleteTask,
    newMember,
    addMember,
    deleteMember
};