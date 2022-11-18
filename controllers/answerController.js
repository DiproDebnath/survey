const createHttpError = require("http-errors");
const answerService = require("../services/answerService");

module.exports = {
  createAnswer: async (req, res) => {
    const validateAnswer =
      await answerService.validateQuestionBeforeCreateAnswer(req.body);

    if (!validateAnswer.success)
      throw createHttpError(validateAnswer.status, validateAnswer.message);

    let answer = {};
    if (validateAnswer.questionType == "single") {
      answer = await answerService.createAnswerSingle(
        req.body.questionId,
        req.body.answer
      );
    } else {
      answer = await answerService.createAnswerWithChoice(
        req.body.questionId,
        req.body.choice
      );
    }
    if (!answer.success) throw createHttpError(answer.status, answer.message);

    res.json({message: answer.message});
  },
};
