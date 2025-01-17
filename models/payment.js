// models/Payment.js (Updated with relationships)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  payment_date: { type: DataTypes.DATE, allowNull: false },
  amount_paid: { type: DataTypes.DECIMAL, allowNull: false },
  payment_method: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{
  freezeTableName :true
});


module.exports = Payment;