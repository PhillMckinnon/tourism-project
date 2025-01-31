const Tour = require('../models/tourModel'); 
const Country = require('../models/countryModel'); 

exports.createTour = async (req, res) => {
    try {
        const { country_id, name, description, price, departure_date, return_date, available } = req.body;

        
        const country = await Country.findByPk(country_id);
        if (!country) {
            return res.status(404).json({ message: "country is not found!" });
        }

       
        const newTour = await Tour.create({
            country_id,
            name,
            description,
            price,
            departure_date,
            return_date,
            available,
        });

        return res.status(201).json(newTour);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'error!' });
    }
};


exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.findAll({
            include: [{
                model: Country,
                attributes: ['id', 'name'], 
                as: 'country', 
            }],
        });

        return res.status(200).json(tours);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error!' });
    }
};


exports.getTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findByPk(id, {
            include: [{
                model: Country,
                attributes: ['id', 'name'],
            }],
        });

        if (!tour) {
            return res.status(404).json({ message: 'tour not found' });
        }

        return res.status(200).json(tour);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error' });
    }
};


exports.updateTour = async (req, res) => {
    try {
        const { id } = req.params;
        const { country_id, name, description, price, departure_date, return_date, available } = req.body;

        const tour = await Tour.findByPk(id);

        if (!tour) {
            return res.status(404).json({ message: 'tour not found!' });
        }

        
        const country = await Country.findByPk(country_id);
        if (!country) {
            return res.status(404).json({ message: 'country not found!' });
        }

        
        await tour.update({
            country_id,
            name,
            description,
            price,
            departure_date,
            return_date,
            available,
        });

        return res.status(200).json(tour);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server Error' });
    }
};


exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.params;

        const tour = await Tour.findByPk(id);
        if (!tour) {
            return res.status(404).json({ message: 'tour not found' });
        }

        await tour.destroy();

        return res.status(200).json({ message: 'tour removed!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server Error' });
    }
};
