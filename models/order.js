const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./customers');
const Seller = require('./seller');
const Product = require('./product');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    initial_payment: {
        type: DataTypes.DECIMAL(10, 2)
    },
    installment_period: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: Customer, 
            key: 'id'
        },
        allowNull: false
    },
    seller_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: Seller, 
            key: 'id'
        },
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product, 
            key: 'id'
        },
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Order;