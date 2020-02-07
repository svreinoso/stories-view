const User = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

/**
 * userController.list()
 */
exports.list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err,
            });
        }
        return res.json(users);
    });
};

/**
 * userController.show()
 */
exports.show = (req, res) => {
    console.log(req.session);
    console.log(req.user);
    const { id } = req.params;
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err,
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'No such user',
            });
        }
        return res.json(user.toProfileJSONFor());
    });
};

exports.follow = (req, res) => {
    console.log(req);
    const { id } = req.params;
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err,
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'No such user',
            });
        }
        return res.json(user.toProfileJSONFor());
    });
};

/**
 * userController.create()
 */
exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
    });

    user.save((err, createdUser) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err,
            });
        }
        return res.status(201).json(createdUser);
    });
};

/**
 * userController.update()
 */
exports.update = (req, res) => {
    const { id } = req.params;

    User.findOneAndUpdate(
        {
            _id: id,
        },
        {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
        }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User not found with id ${req.params.id}`,
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `User not found with id ${req.params.id}`,
                });
            }
            return res.status(500).send({
                message: `Error retrieving User with id ${req.params.id}`,
            });
        });
};

exports.remove = (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, err => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the user.',
                error: err,
            });
        }
        return res.status(204).json();
    });
};