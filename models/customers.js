const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("Customer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT
    },
    passport_data: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    freezeTableName: true
});



module.exports = Customer;
