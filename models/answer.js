'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Question, Choice, AnswerChoice}) {
      // define association here
      this.belongsTo(Question, {foreignKey: "question_id"});

      this.belongsToMany(Choice, { through: AnswerChoice })
    }
  }
  Answer.init({
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};