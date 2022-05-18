const { model } = require('mongoose');
const { findById } = require('../models/project');
let Task = require('../models/task');
let Project = require('../models/project');

async function showDashboard(req, res, next) {
    if (req.user) {
        let userProjects = await Project.find({ groupMembers: { "$in": [req.user._id] } });

        let userTasks = await Task.find({ assignedTo: req.user.id })

        console.log("user Tasks", userTasks);

        res.render('dashboard', {
            user: req.user,
            userProjects,
            userTasks,
            title: "My Dashboard"
        });
    } else {
        res.redirect('/');
    }
}


module.exports = {
    showDashboard
};