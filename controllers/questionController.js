const { Question, Choice } = require("../models");


module.exports = {
    getAllQuestion: async (req, res) => {
        try {
          const question = await Question.findAll({
            include: [
              {
                model: Choice,
              },
            ],
          });
      
          res.json(question);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        }
      },
      getQuestionById : async (req, res) => {
        try {
          let question = await Question.findOne({ where: { id: req.params.id } });
          question = question == null ? { message: "No Question found" } : question;
          res.json(question);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        }
      },
      createQuestion : async (req, res) => {
        try {
          const question = await Question.create({
            question: req.body.question,
            surveyId: req.body.surveyId,
            questionType: req.body.questionType,
          });
      
          res.json(question);
        } catch (err) {
      
          if(err.errors){
            res.json({ message: err.errors[0].message });
          }else{
            res.status(500).json({ message: "Internal server error" });
          }
        }
      },
      updateQuestion: async (req, res) => {
        const updateData = {};
        if (req.body.question) updateData.question = req.body.question;
        if (req.body.surveyId) updateData.surveyId = req.body.surveyId;
        if (req.body.questionTypeId)
          updateData.questionTypeId = req.body.questionTypeId;
      
        try {
          await Question.update(updateData, {
            where: { id: req.params.id },
          });
          const question = await Question.findOne({ where: { id: req.params.id } });
          res.json(question);
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal server error" });
        }
      }
}