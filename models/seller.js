const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seller = sequelize.define('Seller', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passport_data: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hire_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'seller'),
        defaultValue: 'admin',
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true
});

module.exports = Seller;