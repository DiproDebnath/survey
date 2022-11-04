'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Question}) {
      this.hasOne(Question, {foreignKey: "question_type_id"})
    }
  }
  QuestionType.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "question_types",
    modelName: 'QuestionType',
  });
  return QuestionType;
};