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
      this.belongsTo(Question, {foreignKey: "questionId"});

      this.belongsToMany(Choice, { through: AnswerChoice, foreignKey: "answerId"  })
    }
  }
  Answer.init({
    answer: {
      type: DataTypes.STRING
    },
    questionId : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};