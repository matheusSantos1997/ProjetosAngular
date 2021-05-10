const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     'firstname':String,
     'lastname':String,
     'address':String,
     'city':String,
     'state':String,
     'phone':String,
     'mobilephone': String,
     'email': String,
     'password': String
});

module.exports = mongoose.model('User', UserSchema);