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
     static associate({ Survey, Answer, Choice }) {
      this.belongsTo(Survey, {foreignKey: "surveyId"} );
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
    },
    questionType: {
      type:DataTypes.ENUM("single", "multiple"),
      allowNull: false,
      defaultValue: "single",
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};