const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// vai ter um Array de id de departments e o ref é qual collection vai referenciar
const objectId = { type: mongoose.Schema.Types.ObjectId, ref: 'Department'};

const productSchema = new Schema({
      name: String,
      price: Number,
      stock: Number,
      departments: [objectId]
}, {versionKey: false}); // versionKey: false retira o _v da collection no mongoDb

module.exports = mongoose.model('Product', productSchema);