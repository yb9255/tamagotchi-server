const express = require('express');
const logger = require('morgan');

const userRouter = require('./routes/userRouter');

const { connectDB } = require('./services/db');

const app = express();

connectDB();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

module.exports = app;
