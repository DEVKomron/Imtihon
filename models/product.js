const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    quantity_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    brand: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName :true
  });


module.exports = Product;