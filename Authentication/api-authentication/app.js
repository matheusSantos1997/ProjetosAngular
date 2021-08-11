const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const routesApi = require('./routes/routes');
const routesAuth = require('./routes/auth');

mongoose.connect('mongodb://localhost:27017/auth_test', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

app.use('/api', routesApi);
app.use('/auth', routesAuth);

app.use((req, res, next) => {
     res.status(404).send('Not Found!')
});

// app.get('/', (req, res) => {
//    res.send('Hello World!');
// });

app.listen(3000, () => {
    console.log('rodando na porta 3000');
})