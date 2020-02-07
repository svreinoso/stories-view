const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user[email]',
            passwordField: 'user[password]',
        },
        (email, password, done) => {
            User.findOne({
                email,
            })
                .then(user => {
                    if (!user || !user.validPassword(password)) {
                        return done(null, false, {
                            errors: {
                                'email or password': 'is invalid',
                            },
                        });
                    }
                    return done(null, user);
                })
                .catch(done);
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => {
        console.log(user);
        done(null, user);
    });
});