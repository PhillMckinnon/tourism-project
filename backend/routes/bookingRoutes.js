const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/bookings', bookingsController.createBooking);
router.get('/bookings', bookingsController.getAllBookings);
router.get('/bookings/:id', bookingsController.getBookingById);
router.put('/bookings/:id', bookingsController.updateBooking);
router.delete('/bookings/:id', bookingsController.deleteBooking);

module.exports = router;
