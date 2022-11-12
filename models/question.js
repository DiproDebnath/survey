'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Survey, QuestionType, Answer, Choice }) {
      this.belongsTo(Survey, {foreignKey: "surveyId"} );
      this.belongsTo(QuestionType, {foreignKey: "questionTypeId"} );
      this.hasMany(Choice, {foreignKey: "questionId"});
      this.hasMany(Answer, {foreignKey: "questionId"});
    }
  }
  Question.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
      validate: {
        async isExist(value) {
          
          let count = await Question.count({
            where: {surveyId: value}
          })
         
          if (count !== 0) {
            throw new Error('You can add single question in a survey');
          }
        }
      }
    },
    questionTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};