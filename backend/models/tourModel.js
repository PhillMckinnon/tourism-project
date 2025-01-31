const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Country = require('./countryModel');  

const Tour = sequelize.define('Tour', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'countries',  
            key: 'id',
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    departure_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    tableName: 'tours',
    timestamps: true,
});

Tour.belongsTo(Country, {
    foreignKey: 'country_id',
    as: 'country',
});

Country.hasMany(Tour, {
    foreignKey: 'country_id',
    as: 'Tours',
});

module.exports = Tour;
