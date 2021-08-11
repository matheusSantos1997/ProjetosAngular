const ProductModel = require('../models/ProductModel');

module.exports = {
    all: (req, res) => {
       ProductModel.find({}).lean().exec((error, products) => {
        if(error) {
           return res.json({message:'erro ao retornar dados!'});
        } else {
          return res.json(products);
        }
        
       })
    }
};