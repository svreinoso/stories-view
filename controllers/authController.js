const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('user');

exports.logout = (req, res) => {
    req.logout();
    res.send();
}

exports.login = (req, res, next) => {
    if (!req.body.user.email) {
        return res.status(422).json({
            errors: {
                email: "can't be blank",
            },
        });
    }

    if (!req.body.user.password) {
        return res.status(422).json({
            errors: {
                password: "can't be blank",
            },
        });
    }
    passport.authenticate(
        'local',
        {
            session: true,
        },
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (user) {
                user.token = user.generateJWT();
                req.user = user;
                console.log(user);
                // req.session.user = req.user;
                return res.json({
                    user: user.toAuthJSON(),
                });
            }
            return res.status(422).json(info);
        }
    )(req, res, next);
};

exports.register = (req, res, next) => {
    let body = req.body.user;
    if (!body) {
        res.status(400).json({
            message: "user is required."
        })
        return;
    }
    if (!body.email) {
        res.status(400).json({
            message: "email is required."
        })
        return;
    }
    if (!body.username) {
        res.status(400).json({
            message: "username is required."
        })
        return;
    }
    if (!body.password) {
        res.status(400).json({
            message: "password is required."
        })
        return;
    }
    const user = new User();

    user.username = body.username;
    user.email = body.email;
    user.phoneNumber = body.phoneNumber;
    user.lastName = body.lastName;
    user.firstName = body.firstName;
    user.setPassword(body.password);

    user
        .save()
        .then(() => {
            return res.json({
                user: user.toAuthJSON(),
            });
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};