'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     toJSON(){
      return {...this.get(), AnswerChoice: undefined}
    }
     static associate({ Question, Answer, AnswerChoice }) {
      // define association here
      this.belongsTo(Question, {foreignKey: "questionId"});
      this.belongsToMany(Answer, { through: AnswerChoice, foreignKey: "choiceId" });
    }
  }
  Choice.init({
    choice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Choice',
  });
  return Choice;
};