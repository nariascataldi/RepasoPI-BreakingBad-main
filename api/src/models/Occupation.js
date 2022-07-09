const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('occupation',{
  //id:{}, sequelize lo va a crear automaticamente
  name:{
    type: DataTypes.STRING,
    allowNull: false
  }    
  })
};