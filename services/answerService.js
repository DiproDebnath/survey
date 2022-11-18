const { Question, Answer, AnswerChoice, sequelize, Choice } = require("../models");

module.exports = {
  createAnswerSingle: async (questionId, reqAnswer) => {
    try {
      const answer = await Answer.create({
        answer: reqAnswer,
        questionId: questionId,
      });

      return {
        success: true,
        message: "Answer successfully created",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
  createAnswerWithChoice: async (questionId, choice) => {
    const t = await sequelize.transaction();

    try {
      const answer = await Answer.create(
        {
          questionId: questionId,
        },
        { transaction: t }
      );

      const choiceItem = choice.map((item) => {
        return { answerId: answer.id, choiceId: item };
      });

      await AnswerChoice.bulkCreate(choiceItem, {
        transaction: t,
      });
      await t.commit();

      return {
        success: true,
        message: "Answer successfully created",
      };
    } catch (err) {
      await t.rollback();
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },

  validateQuestionBeforeCreateAnswer: async (answerRequest) => {
    try {
      const question = await Question.findOne({
        where: answerRequest.questionId,
      });

      if (!question) {
        return {
          success: false,
          status: 404,
          message: "Please insert a valid questionId",
        };
      }
      if (
        question &&
        question.questionType == "single" &&
        !answerRequest.answer
      ) {
        return {
          success: false,
          status: 422,
          message: "This question accept single answer",
        };
      } else if (
        question &&
        question.questionType == "multiple" &&
        !answerRequest.choice
      ) {
        return {
          success: false,
          status: 422,
          message: "This question accept multiple choice",
        };
      }

      return {
        success: true,
        questionType: question.questionType,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
    }
  },
};
