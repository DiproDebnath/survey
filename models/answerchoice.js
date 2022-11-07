'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerChoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
     static associate(models) {
      // define association here
     
    }
  }
  AnswerChoice.init({
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    choiceId : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AnswerChoice',
  });
  return AnswerChoice;
};