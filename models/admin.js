const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id:{
     type: DataTypes.INTEGER, 
     primaryKey: true, 
     autoIncrement: true 
  },
  username:{ 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  password:{ 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  created_at:{ 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
},{
  freezeTableName :true
});

module.exports = Admin;