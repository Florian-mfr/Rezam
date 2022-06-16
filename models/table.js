'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      // this.belongsTo(models.User, {as: 'user_id'})
    }
  }
  Table.init({
    name: DataTypes.STRING,
    status: DataTypes.ENUM('READY', 'COOKING', 'ERROR', 'SERVED'),
    price: DataTypes.INTEGER,
    account: DataTypes.STRING,
    is_paid: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table
}