const { Question, Choice, Survey } = require("../models");

module.exports = {
  getAllChoice: async () => {
    try {
      const choice = await Choice.findAll();

      return {
        success: true,
        data: choice,
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

  validateSurveyBeforeCreateChoice: async (questionId, userId) => {
    try {
      const question = await Question.findOne({
        where: questionId,
        include: [
          {
            model: Survey,
          },
        ],
      });

      

      if (!question) {
        return {
          success: false,
          status: 404,
          message: "Please insert a valid questionId",
        };
      }
      if (question && question.Survey.userId !== userId) {
        return {
          success: false,
          status: 401,
          message:
            "You are not owner of this survey to create this question Choices",
        };
      }
      if (question && question.questionType !== "multiple") {
        return  {
          success: false,
          status: 422,
          message: "Question type is single",
        };
      }

      return {
        success: true,
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
  createChoice: async (questionId, choice) => {
    try {
      const choiceItem = choice.map((item) => {
        return { questionId: questionId, choice: item };
      });
      const choices = await Choice.bulkCreate(choiceItem);

      return {
        success: true,
        data: choices,
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
