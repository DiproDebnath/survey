const createHttpError = require("http-errors");
const { Survey, Question, Answer, Choice } = require("../models");
const surveyService = require("../services/surveyService");

module.exports = {
  getAllSurvey: async (req, res) => {
    const surveyData = await surveyService.getAllSurvey();
    if (!surveyData.success)
      throw createHttpError(surveyData.status, surveyData.message);

    res.json(surveyData.data);
  },
  getSurveyById: async (req, res) => {
    const surveyData = await surveyService.getSurveyById(req.params.id);

    if (!surveyData.success)
      throw createHttpError(surveyData.status, surveyData.message);

    res.json(surveyData.data);
  },

  getResultById: async (req, res) => {
    const surveyData = await surveyService.getResultById(req.params.id);

    if (!surveyData.success)
      throw createHttpError(surveyData.status, surveyData.message);

    res.json(surveyData.data);
  },

  createSurvey: async (req, res) => {
    const surveyData = await surveyService.createSurvey(
      req.user.id,
      req.body.name
    );

    if (!surveyData.success)
      throw createHttpError(surveyData.status, surveyData.message);

    res.status(surveyData.status).json(surveyData.data);
  },

  updateSurveyById: async (req, res) => {
    const validation = await surveyService.validateSurvey(
      req.user.id,
      req.params.id
    );

    if (!validation.success)
      throw createHttpError(validation.status, validation.message);

    const surveyData = await surveyService.updateSurveyById(
      req.params.id,
      req.user.id,
      req.body.name
    );

    if (!surveyData.success)
      throw createHttpError(surveyData.status, surveyData.message);

    res.status(surveyData.status).json(surveyData.data);
  },
};
