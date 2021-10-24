'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
    title: {
      type: DataTypes.STRING,
      defaultValue: 'unknown',
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'unknown',
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1500),
      defaultValue: 'unknown',
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'unknown',
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};