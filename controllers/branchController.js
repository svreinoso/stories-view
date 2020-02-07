var branchModel = require('../models/branchModel.js');

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
			name : req.body.name,
			color : req.body.color

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
			branch.color = req.body.color ? req.body.color : branch.color;
			
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
