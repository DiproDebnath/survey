const createHttpError = require("http-errors");

const questionService = require("../services/questionService");

module.exports = {
  getAllQuestion: async (req, res) => {
    const questionData = await questionService.getAllQuestion();
    if (!questionData.success)
      throw createHttpError(questionData.status, questionData.message);

    res.json(questionData.data);
  },
  getQuestionById: async (req, res) => {
    const questionData = await questionService.getQuestionById(req.params.id);

    if (!questionData.success)
      throw createHttpError(questionData.status, questionData.message);

    res.json(questionData.data);
  },
  createQuestion: async (req, res) => {
    const validation = await questionService.validateSurveyforCreateQuestion(
      req.user.id,
      req.body.surveyId
    );

    if (!validation.success)
      throw createHttpError(validation.status, validation.message);

    const questionData = await questionService.createQuestion(req.body);

    if (!questionData.success)
      throw createHttpError(questionData.status, questionData.message);

    res.json(questionData.data);

  },
  updateQuestion: async (req, res) => {
    const validation = await questionService.validateQuestionforUpdate(
      req.params.id, req.user.id)

      if (!validation.success)
      throw createHttpError(validation.status, validation.message);
      
      
      const questionData = await questionService.updateQuestion(req);

      if (!questionData.success)
        throw createHttpError(questionData.status, questionData.message);
  
      res.json(questionData.data);
   
  },
};
