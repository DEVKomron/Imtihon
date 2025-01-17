const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName :true
  });

module.exports = OrderItem;