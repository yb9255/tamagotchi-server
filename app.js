const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const { connectDB } = require('./services/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
