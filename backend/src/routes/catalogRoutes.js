const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/services', catalogController.getServices);
router.get('/barbers', catalogController.getBarbers);

module.exports = router;