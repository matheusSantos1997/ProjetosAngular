const mongoose = require('mongoose'); // importaçao do mongoose

mongoose.connect('mongodb://localhost:27017/http_app', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

require('./models/department');
// require('./product');

const app = require('./app');
app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
     console.log(`Servidor rodando na porta: ${server.address().port}`);
});
