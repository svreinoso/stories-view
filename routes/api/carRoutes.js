var express = require('express');
var router = express.Router();
var carController = require('../../controllers/carController.js');
const auth = require('../../midleware/auth');

/*
 * GET
 */
router.get('/', auth.required, carController.list);

/*
 * GET
 */
router.get('/:id', carController.show);

/*
 * POST
 */
router.post('/', carController.create);

/*
 * PUT
 */
router.put('/:id', carController.update);

/*
 * DELETE
 */
router.delete('/:id', carController.remove);

module.exports = router;
