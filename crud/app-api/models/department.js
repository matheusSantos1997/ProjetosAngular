const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String,
}, { versionKey: false });

module.exports = mongoose.model('Department', departmentSchema);