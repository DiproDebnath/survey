const { Survey, Question, Choice } = require("../models");

module.exports = {
  getAllQuestion: async () => {
    try {
      const question = await Question.findAll({
        include: [
          {
            model: Choice,
          },
        ],
      });
      if (!question) {
        return {
          success: false,
          status: 404,
          message: "no question found",
        };
      }

      return {
        success: true,
        data: question,
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
  getQuestionById: async (questionId) => {
    try {
      let question = await Question.findOne({ where: { id: questionId } });

      if (!question) {
        return {
          success: false,
          status: 404,
          message: "No Question found",
        };
      }
      return {
        success: true,
        data: question,
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
  createQuestion: async (questionData) => {
    try {
      const question = await Question.create({
        question: questionData.question,
        surveyId: questionData.surveyId,
        questionType: questionData.questionType,
      });
      return {
        success: true,
        data: question,
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

  updateQuestion: async (req) => {
    const updateData = {};
    if (req.body.question) updateData.question = req.body.question;
    if (req.body.surveyId) updateData.surveyId = req.body.surveyId;
    if (req.body.questionType) updateData.questionType = req.body.questionType;

    try {
      await Question.update(updateData, {
        where: { id: req.params.id },
      });
      const question = await Question.findOne({ where: { id: req.params.id } });

      return {
        success: true,
        data: question,
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

  validateSurveyforCreateQuestion: async (userId, surveyId) => {
    const survey = await Survey.findOne({
      where: { id: surveyId },
    });

    if (!survey) {
      return {
        success: false,
        status: 404,
        message: "Please insert a valid surveyId",
      };
    }

    if (survey && survey.userId !== userId) {
      return {
        success: false,
        status: 401,
        message: "You are not owner of this survey to create a Question",
      };
    }

    return {
      success: true,
    };
  },
  validateQuestionforUpdate: async (questionId, userId) => {
    try {
      const question = await Question.findOne({
        where: { id: questionId },
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
          message: "You are not owner of this survey to update this Question",
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
};
