const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/appointments', bookingController.createAppointment);
router.get('/appointments', authMiddleware, bookingController.getAppointments);

module.exports = router;