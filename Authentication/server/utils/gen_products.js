const mongoose = require('mongoose');
var faker = require('faker');
var ProductModel = require('../models/ProductModel');

mongoose.connect('mongodb://localhost:27017/auth_test', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

const add = async (n) => {
   try{

    for(let i=0; i<n; i++){
        const p = new ProductModel();
        p.name = faker.commerce.productName();
        p.department = faker.commerce.department();
        p.price = faker.commerce.price();
        await p.save()
     }

   } catch(err) {
       console.error(err);
   }
};

// adiciona 100 produtos
add(100).then(() => {
    console.log('Ok');
    mongoose.disconnect();
});