const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); //pointing images folder
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  if (
      file.mimeType === 'image/png' ||
      file.mimeType === 'image/jpg' ||
      file.mimeType === 'image/jpeg') {
      cb(null, true); //file upload success
  } else {
      cb(null, false); //file upload fail
  }
};

// x-www-form-urlencoded, <form>, for form data
// app.use(bodyParser.urlencoded());

// application/json, parse json data.
app.use(bodyParser.json());
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single('image') //field 이름이 image
);

//
//아래 /images를 설정해주지 않으면 /로 들어와도 image가 보이는 현상이 있음.
/*
* __dirname : app.js root file
* */
app.use('/images', express.static(path.join(__dirname, 'images')));

//set middleware for CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //arg2: domains. or use wild card
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //arg2: allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //arg2: allow headers
    // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

//General Error Handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

const password = "Y2wdkB4znFPPyx3o";
const uri = `mongodb+srv://paigeshin:${password}@cluster0-zwpei.mongodb.net/messages?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {a
        app.listen(8080);
    })
    .catch(err => console.log(err));