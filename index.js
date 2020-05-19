/** Third party packages */
const express = require('express');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');

/** Setting environment to run local or production */
const app = express();
const PORT = process.env.PORT || 3000;
const ALLOW_DEBUGGING = process.env.DEBUG || true;

const dotenv = require('dotenv');
dotenv.config();

const dbConfig = require('./config/database.config.js');
const api = require('./routes');

mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

mongoose.set('debug', ALLOW_DEBUGGING);

app.use(errorhandler());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the story api.',
    });
});

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


app.use(api);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});