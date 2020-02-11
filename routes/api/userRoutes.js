var express = require('express');
var router = express.Router();
const auth = require('../../midleware/auth');
var userController = require('../../controllers/userController');

/*
 * GET
 */
router.get('/', auth.required, userController.list);

/*
 * GET
 */
router.get('/:id', auth.required, userController.show);

/*
 * POST
 */
router.post('/', auth.required, userController.create);

/*
 * PUT
 */
router.put('/:id', auth.required, userController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.required, userController.remove);

module.exports = router;
