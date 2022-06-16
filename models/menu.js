'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {}
  Menu.init({
    name: DataTypes.STRING,
    account: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu
}