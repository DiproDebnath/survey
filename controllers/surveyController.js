const { Survey, Question, Answer, Choice } = require("../models");

module.exports = {
  getAllSurvey: async (req, res) => {
    try {
      const survey = await Survey.findAll({
        include: [
          {
            model: Question,
            include: [
              {
                model: Choice,
              },
            ],
          },
        ],
      });
      res.json(survey);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getSurveyById: async (req, res) => {
    try {
      let survey = await Survey.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Question,
            include: [
              {
                model: Choice,
              },
            ],
          },
        ],
      });
      survey = survey == null ? { message: "No Survey found" } : survey;
      res.json(survey);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getResultById: async (req, res) => {
    try {
      let survey = await Survey.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Question,
            include: [
              {
                model: Answer,
                include: [
                  {
                    model: Choice,
                    through: {
                      attributes: [],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
      survey = survey == null ? { message: "No Survey found" } : survey;
      res.json(survey);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createSurvey: async (req, res) => {
    try {
      const survey = await Survey.create({
        name: req.body.name,
      });

      res.json(survey);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateSurveyById: async (req, res) => {
    try {
      await Survey.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.params.id },
        }
      );
      const survey = await Survey.findOne({ where: { id: req.params.id } });
      res.json(survey);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
