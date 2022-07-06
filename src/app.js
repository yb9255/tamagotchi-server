const express = require('express');

const { connectDB } = require('./services/db');

const app = express();

connectDB();

module.exports = app;
