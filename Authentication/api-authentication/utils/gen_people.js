const mongoose = require('mongoose');
var faker = require('faker');
var PersonModel = require('../models/PersonModel');

mongoose.connect('mongodb://localhost:27017/auth_test', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

const add = async (n) => {
   try{

    for(let i=0; i<n; i++){
        const p = new PersonModel();
        p.name = faker.name.firstName();
        p.country = faker.address.country();
        p.email = faker.internet.email();
        p.company = faker.company.companyName();
        await p.save();
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