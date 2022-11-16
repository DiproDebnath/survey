const createHttpError = require("http-errors");
const { Survey, Question, Answer, Choice } = require("../models");
const serveyService = require("../services/serveyService");

module.exports = {
  getAllSurvey: async (req, res) => {
    const surveyData = await serveyService.getAllSurvey();
    if (!surveyData.success) {
      throw createHttpError(surveyData.status, surveyData.message);
    }
    res.json(surveyData.data);
  },
  getSurveyById: async (req, res) => {
    const surveyData = await serveyService.getSurveyById(req.params.id);
    if (!surveyData.success) {
      throw createHttpError(surveyData.status, surveyData.message);
    }
    res.json(surveyData.data);
  },

  getResultById: async (req, res) => {
    const surveyData = await serveyService.getResultById(req.params.id);
    if (!surveyData.success) {
      throw createHttpError(surveyData.status, surveyData.message);
    }
    res.json(surveyData.data);
  },

  createSurvey: async (req, res) => {
    const surveyData = await serveyService.createSurvey(req.body.name);

    res.status(surveyData.status).json(surveyData.data);
  },

  updateSurveyById: async (req, res) => {
    const surveyData = await serveyService.createSurvey(
      req.params.id,
      req.body.name
    );

    res.status(surveyData.status).json(surveyData.data);
  },
};
