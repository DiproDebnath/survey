const createHttpError = require("http-errors");
const choiceService = require("../services/choiceService");

module.exports = {
  getAllChoice: async (req, res) => {
    const choiceData = await choiceService.getAllChoice();
    if (!choiceData.success)
      throw createHttpError(choiceData.status, choiceData.message);

    res.json(choiceData.data);
  },
  createChoice: async (req, res) => {
    const validateChoice = await choiceService.validateSurveyBeforeCreateChoice(
      req.body.questionId,
      req.user.id
    );
    if (!validateChoice.success)
      throw createHttpError(validateChoice.status, validateChoice.message);

    const choices = await choiceService.createChoice(
      req.body.questionId,
      req.body.choice
    );

    if (!choices.success)
      throw createHttpError(choices.status, choices.message);

    res.json(choices.data);
  },
};
