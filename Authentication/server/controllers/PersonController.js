const PersonModel = require('../models/PersonModel');

module.exports = {
    all: (req, res) => {
       PersonModel.find({}).lean().exec((error, people) => {
           if (error) {
               return res.json()
           } else {
               return res.json(people);
           }
       })
    }
}