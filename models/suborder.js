'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Suborder extends Model {
    static associate(models) {
      // this.belongsTo(models.Product, {as: 'product_id'})
      // this.belongsTo(models.Order, {as: 'order_id'})
    }
  }
  Suborder.init({
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    price: DataTypes.INTEGER,
    running_order: DataTypes.INTEGER,
    status: DataTypes.ENUM('READY', 'COOKING', 'ERROR', 'SERVED'),
  }, {
    sequelize,
    modelName: 'Suborder',
  });
  return Suborder
}