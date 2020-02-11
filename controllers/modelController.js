var ModelModel = require('../models/modelModel.js');

var express = require('express');
var router = express.Router();
const mongoose_utils = require("mongoose-rest-utils");

router.get("/all", async function (req, res) {
    try {
        let models = await ModelModel.find().populate('Branch').exec();
        res.json(models);
    } catch (error) {
        res.status(500).json({
            message: 'Error when getting branch.',
            error: err
        });
    }
});

/**
 * Create a new model
 * @route POST /model
 * @group model - Operations about model
 * @param {string} name.body
 * @returns {object} 200 - An array of Models
 * @returns {Error}  default - Unexpected error
 */

router.post("/", function (req, res) {
    mongoose_utils.post(req, res, ModelModel);
});

/**
 * Modify model
 * @route PUT /model
 * @group model - Operations about model
 * @param {string} name.body
 * @returns {object} 200 - The newly modified model
 * @returns {Error}  default - Unexpected error
 */

router.put("/", function (req, res) {
    mongoose_utils.put(req, res, ModelModel);
});



/**
 * Get all Models
 * @route GET /model
 * @group model - Operations about model
 * @param {string} _id.query - (optional) get by _id
* @param {string} name.query - (optional) get by name
 * @returns {object} 200 - An array of Models
 * @returns {Error}  default - Unexpected error
 */


router.get("/", function (req, res) {
    req.query["populate_branch"] = true;
    mongoose_utils.get(req, res, ModelModel);
});


/**
 * Get all Models
 * @route GET /model/:id
 * @group model - Operations about model
 * @param {string} _id.query - (optional) get by _id
* @param {string} name.query - (optional) get by name
 * @returns {object} 200 - An array of Models
 * @returns {Error}  default - Unexpected error
 */


router.get("/:id", async function (req, res) {
    try {
        let models = await ModelModel.findOne({ _id: req.params.id }).populate('branch').exec();
        res.json(models);
    } catch (error) {
        res.status(500).json({
            message: 'Error when getting branch.',
            error: err
        });
    }
});

/**
 * Delete a model
 * @route DELETE /model/:id
 * @group model - Operations about model
 * @param {string} id.query.required
 * @returns {object} 200 - An array of Models
 * @returns {Error}  default - Unexpected error
 */


router.delete("/:id", function (req, res) {
    mongoose_utils.delete(req, res, ModelModel);
});

module.exports = router;