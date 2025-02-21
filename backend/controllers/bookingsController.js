const { Bookings, Client, Tour } = require('../models');

exports.createBooking = async (req, res) => {
    try {
        const { client_id, tour_id, booking_date, status } = req.body;


        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(404).json({ message: "client not found!" });
        }


        const tour = await Tour.findByPk(tour_id);
        if (!tour) {
            return res.status(404).json({ message: "tour not found!" });
        }


        const newBooking = await Bookings.create({
            client_id,
            tour_id,
            booking_date,
            status,
        });

        return res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error!' });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.findAll({
            include: [
                {
                    model: Client,
                    as: 'ClientBooking',
                    attributes: ['id', 'email'], 
                },
                {
                    model: Tour,
                    as: 'TourBooking',
                    attributes: ['id', 'name', 'departure_date', 'return_date'], 
                },
            ],
        });

        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error!' });
    }
};


exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findByPk(id, {
            include: [
                {
                    model: Client,
                    as: 'ClientBooking',
                    attributes: ['id', 'email'],
                },
                {
                    model: Tour,
                    as: 'TourBooking',
                    attributes: ['id', 'name', 'departure_date', 'return_date'],
                },
            ],
        });

        if (!booking) {
            return res.status(404).json({ message: 'booking not found!' });
        }

        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error!' });
    }
};


exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { client_id, tour_id, booking_date, status } = req.body;

        const booking = await Bookings.findByPk(id);

        if (!booking) {
            return res.status(404).json({ message: 'booking not found!' });
        }

        
        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(404).json({ message: 'client not found!' });
        }

        
        const tour = await Tour.findByPk(tour_id);
        if (!tour) {
            return res.status(404).json({ message: 'tour not found!' });
        }

        
        await booking.update({
            client_id,
            tour_id,
            booking_date,
            status,
        });

        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server error!' });
    }
};


exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Bookings.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'booking not found!' });
        }

        await booking.destroy();

        return res.status(200).json({ message: 'booking deleted!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'server Error!' });
    }
};
