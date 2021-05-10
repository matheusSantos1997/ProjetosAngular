const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    'name':String,
    'country':String,
    'email': String,
    'company': String
});

module.exports = mongoose.model('Person', PersonSchema);