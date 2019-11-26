'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connects to DB
mongoose.connect(
  'mongodb+srv://pmarcosfelipe:s1f65v9200@cluster0-b4zlk.azure.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
