const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createAppointmentSchema, getAppointmentsQuerySchema } = require('../validators/bookingValidator');

router.post(
  '/appointments',
  validate(createAppointmentSchema, 'body'),
  bookingController.createAppointment
);

router.get(
  '/appointments',
  authMiddleware,
  validate(getAppointmentsQuerySchema, 'query'),
  bookingController.getAppointments
);

module.exports = router;