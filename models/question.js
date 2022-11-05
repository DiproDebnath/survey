"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Survey, QuestionType, Answer, Choice }) {
      this.belongsTo(Survey, { foreignKey: "survey_id" });
      this.belongsTo(QuestionType, { foreignKey: "question_type_id" });
      this.hasMany(Choice, {foreignKey: "question_id"})
      this.hasMany(Answer, { foreignKey: "question_id" });
    }
  }
  Question.init(
    {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      question_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
