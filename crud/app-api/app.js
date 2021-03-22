const express = require('express'); // importaçao do express
const bodyparser = require('body-parser'); // importaçao de body-parser
const cors = require('cors'); // importaçao do uso de cors
const department_controller = require('./controllers/department_controller');
const product_controller = require('./controllers/product_controller');


const app = express(); // execuçao do express

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cors()); // uso de cors

app.use('/departments', department_controller);
app.use('/products', product_controller);

module.exports = app;