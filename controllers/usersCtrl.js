const { model } = require('mongoose');
let User = require('../models/user');

async function populateDB(req, res){
    var newUser1 = new User({
        name: "Person One",
        email: "testone@gmail.com",
        googleId: "12345"
    });
    var newUser2 = new User({
        name: "Person Two",
        email: "testtwo@gmail.com",
        googleId: "12346"
    });
    var newUser3 = new User({
        name: "Person Three",
        email: "testthree@gmail.com",
        googleId: "12347"
    });
    var newUser4 = new User({
        name: "Person Four",
        email: "testfour@gmail.com",
        googleId: "12348"
    });
    var newUser5 = new User({
        name: "Person Five",
        email: "testfive@gmail.com",
        googleId: "12349"
    });
    await newUser1.save();
    await newUser2.save();
    await newUser3.save();
    await newUser4.save();
    await newUser5.save();
}

module.exports = {
    populateDB
};