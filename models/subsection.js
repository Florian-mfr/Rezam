'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Subsection extends Model {
    static associate(models) {
      // this.belongsTo(models.Section, {as: 'section_id'})
      // this.belongsToMany(models.Product, {as: 'product_ids'})
    }
  }
  Subsection.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Subsection',
  });
  return Subsection
}