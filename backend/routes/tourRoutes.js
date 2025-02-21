const express = require('express');
const router = express.Router();
const toursController = require('../controllers/toursController');

router.post('/tours', toursController.createTour);
router.get('/tours', toursController.getAllTours);
router.get('/tours/:id', toursController.getTourById);
router.put('/tours/:id', toursController.updateTour);
router.delete('/tours/:id', toursController.deleteTour);

module.exports = router;
