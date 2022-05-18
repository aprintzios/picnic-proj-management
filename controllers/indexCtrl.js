const { model } = require('mongoose');
const { findById } = require('../models/project');
let Task = require('../models/task');
let Project = require('../models/project');

async function showDashboard(req, res, next) {
    if (req.user) {
        let userProjects = await Project.find({ groupMembers: { "$in": [req.user._id] } });

        let userTasks = await Task.find({ assignedTo: req.user.id })

        console.log("user Tasks", userTasks);

        // for (let i = 0; i < userProjects.length; i++) {
        //     for (let j = 0; j < userProjects[i].tasks.length; j++) {
        //         if (userProjects[i].tasks[j].assignedTo._id == req.user.id) {
        //             userTasks.push(userProjects[i].tasks[j]);
        //         }
        //     }
        // }

        res.render('dashboard', {
            user: req.user,
            userProjects,
            userTasks
        });
    } else {
        res.redirect('/');
    }
}


module.exports = {
    showDashboard
};