const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
     'name': String,
     'department': String,
     'price': Number
})

module.exports = mongoose.model('Product', ProductSchema);