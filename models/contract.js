const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contract = sequelize.define('Contract', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contract_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true 
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contract_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contract_details: {
        type: DataTypes.STRING,
        defaultValue: 'No details provided'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },  
    OrderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Order', // Model nomi
          key: 'id',      // Asosiy kalit ustuni
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Contract',
    timestamps: false,  
});

module.exports = Contract;
