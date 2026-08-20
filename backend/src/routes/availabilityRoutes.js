const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.get('/barbers/:barberId/availability', availabilityController.getAvailability);

module.exports = router;