const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 8080

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/curso_mern', {
        useNewUrlParser: true , 
        useUnifiedTopology: true
    }).then(() => {
        console.log(' conectado banco de dados')
    }).catch((err) => {
        console.log(' erro banco de dados: '+err)
    });

app.use(cors());

app.use(cookieParser());
app.use(express.json());


app.use(routes);

app.listen(port, () => {
    console.log('server running on port '+port)
});