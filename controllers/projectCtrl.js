const { model } = require('mongoose');
//const { findById } = require('../models/project');
let Project = require('../models/project');
let User = require('../models/user');
let Task = require('../models/task');


async function newProject(req, res) {
    var newProject = new Project({
        name: req.body.projectName,
        createdBy: req.user.id,
        groupMembers: [req.user.id],
    });
    await newProject.save();
    res.redirect('/projects/' + newProject._id);
}

async function createProject(req, res) {
    let user = req.user;
    if (user) {
        let userProjects = await Project.find({ groupMembers: { "$in": [user._id] } });
        res.render('project-new', { user, userProjects, title: "New Project" });
    } else {
        res.redirect('/');
    }
}

async function showProject(req, res) {
    let projectId = req.params.id;
    //get project
    let project = await Project.findById(projectId);
    //get Users
    let users = await User.find();
    //get potential group members --> all users not already a group member
    let potGM = users.filter(user => !project.groupMembers.includes(user._id));

    let tasks = await Task.find({ project: projectId });

    let title = project.name;
    //populate members
    await project.populate('groupMembers');
    for (let i = 0; i < tasks.length; i++) {
        await tasks[i].populate('assignedTo');
    }

    let user = req.user;

    console.log("tasks", tasks);
    //try modifying array for dates

    if (user) {
        let userProjects = await Project.find({ groupMembers: { "$in": [user._id] } });
        res.render('project-show', { project, tasks, user, userProjects, potGM, title });
        // res.render('project-show', { project, tasks, users, user, userProjects, potGM });
    } else {
        res.redirect('/');
    }

}

async function deleteProject(req, res) {

}

async function addTask(req, res) {
    //get project id
    let projectId = req.params.id;
    console.log("date coming in", req.body.dueDate)
    //create new task
    let newTask = new Task({
        name: req.body.taskName,
        project: projectId,
        assignedTo: req.body.assignedTo,
        due: req.body.dueDate,
        status: req.body.status
    });
    await newTask.save();
    //redirect to /project/:id
    res.redirect('/projects/' + projectId);
}

async function showTask(req, res) {
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    let task = await Task.findById(taskId);

    //get project
    let project = await Project.findById(projectId);
    let title = project.name;
    let users = await User.find();
    let user = req.user;
    await project.populate('groupMembers');   
    await task.populate('assignedTo');
    let formYear = task.due.getFullYear();
    let formDay = task.due.getDate();
    console.log("actual date", task.due);
    console.log("form day", formDay);
    if(req.user){
        let userProjects = await Project.find({ groupMembers: { "$in": [user._id] } });
    res.render('task-show', { project, task, users, user, userProjects, title});
    } else {
        res.redirect('/');
    }
}


async function editTask(req, res) {
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    let task = await Task.findById(taskId);
    task.name = req.body.taskName;
    task.assignedTo = req.body.assignedTo;
    task.due = req.body.dueDate;
    task.status = req.body.status;
    await task.save();
    res.redirect('/projects/' + projectId);
}

async function deleteTask(req, res) {
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId);
    res.redirect('/projects/' + projectId);
}

async function deleteTaskFromProj(req, res) {
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId);
    res.redirect('/projects/' + projectId);
}

async function deleteTaskFromDash(req, res) {
    let projectId = req.params.id;
    let taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId);
    res.redirect('/dashboard');
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
    res.redirect('/projects/' + projectId);
}

async function deleteMember(req, res) {
    //!! BEFORE DELETING, MUST CHECK NO TASKS LEFT, CAN PROMPT TO DELETE ALL THEIR TASKS?

    //get userId
    let userId = req.params.memberId;
    //get project
    let projectId = req.params.id;
    let project = await Project.findById(projectId);
    //populate groupMembers
    await project.populate('groupMembers');
    //remove groupMember from project
    for (let i = 0; i < project.groupMembers.length; i++) {
        if (project.groupMembers[i]._id.valueOf() === userId) {
            project.groupMembers.splice(i, 1);
        }
    }
    await project.save();
    res.redirect('/projects/' + projectId);
}

module.exports = {
    newProject,
    createProject,
    showProject,
    deleteProject,
    addTask,
    showTask,
    editTask,
    deleteTask,
    deleteTaskFromProj,
    deleteTaskFromDash,
    newMember,
    addMember,
    deleteMember
};