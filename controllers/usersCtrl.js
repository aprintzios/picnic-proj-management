const { model } = require('mongoose');
let User = require('../models/user');

async function populateDB(req, res){
    var newUser1 = new User({
        name: "Test One",
        email: "testone@gmail.com",
        googleId: "12345"
    });
    var newUser2 = new User({
        name: "Test Two",
        email: "testtwo@gmail.com",
        googleId: "12346"
    });
    var newUser3 = new User({
        name: "Test Three",
        email: "testthree@gmail.com",
        googleId: "12347"
    });
    await newUser1.save();
    await newUser2.save();
    await newUser3.save();
}

module.exports = {
    populateDB
};