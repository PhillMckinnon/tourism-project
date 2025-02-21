const { DataTypes } = require('sequelize');
const  sequelize = require('../config/db');
const Client = require('./clientModel'); 
const Tour = require('./tourModel'); 

const Bookings = sequelize.define('Bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clients', 
            key: 'id',
        },
        allowNull: false,
    },
    tour_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tours',
            key: 'id',
        },
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
}, {
    tableName: 'bookings',
    timestamps: true,
});

module.exports = Bookings;
