const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region_code: {
        type: DataTypes.STRING,
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
    tableName: 'countries',
    timestamps: true,
});
module.exports = Country;
