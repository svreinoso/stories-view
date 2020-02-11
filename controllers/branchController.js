var branchModel = require('../models/branchModel.js');
var mongoose = require('mongoose');
/**
 * branchController.js
 *
 * @description :: Server-side logic for managing branchs.
 */
module.exports = {

    /**
     * branchController.list()
     */
    list: function (req, res) {
        console.log(req.payload)
        branchModel.find(function (err, branchs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting branch.',
                    error: err
                });
            }
            return res.json(branchs);
        });
    },

    /**
     * branchController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        branchModel.findOne({_id: id}, function (err, branch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting branch.',
                    error: err
                });
            }
            if (!branch) {
                return res.status(404).json({
                    message: 'No such branch'
                });
            }
            return res.json(branch);
        });
    },

    /**
     * branchController.create()
     */
    create: function (req, res) {
        var branch = new branchModel({
            _id: new mongoose.Types.ObjectId(),
			name : req.body.name
        });

        branch.save(function (err, branch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating branch',
                    error: err
                });
            }
            return res.status(201).json(branch);
        });
    },

    /**
     * branchController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        branchModel.findOne({_id: id}, function (err, branch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting branch',
                    error: err
                });
            }
            if (!branch) {
                return res.status(404).json({
                    message: 'No such branch'
                });
            }

            branch.name = req.body.name ? req.body.name : branch.name;
			
            branch.save(function (err, branch) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating branch.',
                        error: err
                    });
                }

                return res.json(branch);
            });
        });
    },

    /**
     * branchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        branchModel.findByIdAndRemove(id, function (err, branch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the branch.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
