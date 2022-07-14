const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./src/routes/userRouter');

const { connectDB } = require('./src/services/db');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      process.env.ENV === 'development' && 'http://localhost:3000',
      process.env.CLIENT_URL,
    ],
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

app.get('/', (req, res) => {
  res.send('welcome!');
});

app.use('/api/users', userRouter);

app.use(errorHandler);

module.exports = app;
