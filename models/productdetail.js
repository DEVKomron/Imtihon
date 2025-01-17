const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductDetail = sequelize.define('ProductDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_description: {
        type: DataTypes.TEXT
    },
    specifications: {
        type: DataTypes.TEXT
    },
    manufacturer: {
        type: DataTypes.STRING
    },
    warranty_terms: {
        type: DataTypes.TEXT
    },
    dimensions: {
        type: DataTypes.STRING
    },
    material: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
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

module.exports = ProductDetail;