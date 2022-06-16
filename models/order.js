'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Suborder, {foreignKey: 'id'})
    }
  }
  Order.init({
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    price: DataTypes.INTEGER,
    is_paid: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order
}