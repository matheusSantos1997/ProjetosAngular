const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const productSchema = new Schema({
      name: String,
      price: Number,
      stock: Number,
      // vai ter um Array de id de departments e o ref é qual collection vai referenciar
      departaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }]
}, { versionKey: false }); // versionKey: false retira o _v da collection no mongoDb

module.exports = mongoose.model('product', productSchema);