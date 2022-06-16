'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(models) {
      // this.belongsTo(models.Table, {as: 'table_id'})
      // this.belongsToMany(models.Product, {as: 'product_ids'})
    }
  }
  Section.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section
}