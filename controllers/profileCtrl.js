const { model } = require('mongoose');
const { findById } = require('../models/project');
let User = require('../models/user');

async function editProfile(req, res){
    //get user
    let userId = req.params.id;
    let user = await User.findById(userId);
    res.render('profile-edit', {user});
}
async function updateProfile(req, res){
    
}

module.exports = {
    editProfile,
    updateProfile
};