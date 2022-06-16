'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    account: DataTypes.STRING,
    alcohol: DataTypes.BOOLEAN,
    allergen: DataTypes.ARRAY(DataTypes.STRING),
    ingredients: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product
}