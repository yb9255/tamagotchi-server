const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const { connectDB } = require('./services/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();

app.use(
  cors({
    origin: [process.env.ENV === 'development' && 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  express.json({
    type: '*/*',
  }),
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
