///////////////////////////////////////////////
//////// Todo model                   ///////// 
///////////////////////////////////////////////

// /import the mongoose VARIABLE which holds the configuration. And this is on the file called connection.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

const Users = mongoose.model('user', UserSchema);

module.exports = Users;