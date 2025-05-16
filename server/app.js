const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');

// 🚀 VERY IMPORTANT: Load environment variables
require('dotenv').config();

// Initialize Express
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sessions
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workout'));
app.use('/api/goals', require('./routes/goal'));
app.use('/api/me', require('./routes/user'));
app.use('/api/me/setup', require('./routes/setup'));



// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
