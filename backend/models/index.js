const sequelize = require('../config/db');
const Country = require('./countryModel');
const Tour = require('./tourModel');
const Client = require('./clientModel');
const Bookings = require('./bookingModel');

Country.hasMany(Tour, { foreignKey: 'country_id', as: 'CountryTours' });
Tour.belongsTo(Country, { foreignKey: 'country_id', as: 'TourCountry' });
Bookings.belongsTo(Client, { foreignKey: 'client_id', as: 'ClientBooking' });
Bookings.belongsTo(Tour, { foreignKey: 'tour_id', as: 'TourBooking' });

sequelize.sync({  force: false }) 
    .then(() => console.log('Success!'))
    .catch(err => console.error('Error, error text:', err));

module.exports = { sequelize, Country, Tour, Bookings, Client };
