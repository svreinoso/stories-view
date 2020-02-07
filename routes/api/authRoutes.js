const express = require('express');

const router = express.Router();
const auth = require('../../midleware/auth');
const authController = require('../../controllers/authController');

/**
 * @route GET /login
 * @description login and get token
 * @access public
 */
router.post('/login', auth.optional, authController.login);

/**
 * @route POST /register
 * @description Register new user
 * @access public
 */
router.post('/register', auth.optional, authController.register);

module.exports = router;