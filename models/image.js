const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
},{
    freezeTableName :true
  });

module.exports = Image;
