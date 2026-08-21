const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { loginSchema } = require('../validators/authValidator');

router.post('/login', validate(loginSchema, 'body'), authController.login);

module.exports = router;