const { QuestionType } = require("../models");

module.exports = {
  getAllQuestionType: async (req, res) => {
    try {
      const quesionTypes = await QuestionType.findAll();
      res.json(quesionTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getQuestionTypeById: async (req, res) => {
    try {
      let quesionType = await QuestionType.findOne({
        where: { id: req.params.id },
      });
      quesionType =
        quesionType == null
          ? { message: "No Quesion type found" }
          : quesionType;
      res.json(quesionType);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createQuestionType: async (req, res) => {
    try {
      const quesionType = await QuestionType.create({
        name: req.body.questionType,
      });

      res.json(quesionType);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.errors[0].message });
    }
  },
  updateQuestionType: async (req, res) => {
    try {
      await QuestionType.update(
        {
          name: req.body.questionType,
        },
        {
          where: { id: req.params.id },
        }
      );

      const quesionType = await QuestionType.findOne({
        where: { id: req.params.id },
      });
      res.json(quesionType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
