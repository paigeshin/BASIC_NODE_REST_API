const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// x-www-form-urlencoded, <form>, for form data
// app.use(bodyParser.urlencoded());

// application/json, parse json data.
app.use(bodyParser.json());

//set middleware for CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //arg2: domains. or use wild card
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //arg2: allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //arg2: allow headers
    next();
});

app.use('/feed', feedRoutes);

app.listen(8080);