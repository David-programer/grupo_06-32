'use strict';

const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');
const path = require('path');
const app = express();


//settings
app.set('port', process.env.PORT || 3000);

//midlewars
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routers 
app.use('/user', require(path.join(__dirname, '/routers/user')));

//server initial
app.listen(app.get('port'), ()=>{
    console.log(`server listening on port http://localhost:${app.get('port')}`);
});