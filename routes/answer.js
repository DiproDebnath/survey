const express = require("express");
const router = express.Router();
const { sequelize, Answer, AnswerChoice, Question } = require("../models");

router.post("/", async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const question = await Question.findOne({ where: req.body.questionId });
    if (question.questionTypeId == 1 ) {
      if (!req.body.answer) throw { errors: [{ message: "This question accept single answer" }] };
      const answer = await Answer.create({
        answer: req.body.answer,
        questionId: req.body.questionId,
      });
      res.json(answer);
    }else{
      if (!req.body.choice) throw { errors: [{ message: "This question accept multiple choice" }] };
     
      const answer = await Answer.create({
        questionId: req.body.questionId,
      }, { transaction: t });
      const choiceItem = req.body.choice.map((item) => {
        return { answerId: answer.id, choiceId: item };
      });
     
      const answerChioce = await AnswerChoice.bulkCreate(choiceItem, { transaction: t });
      res.json(answerChioce);
    }

    await t.commit();
  } catch (err) {
    await t.rollback();
    if(err.errors){
      res.json({ message: err.errors[0].message });
    }else{
      res.status(500).json({ message: "Internal server error" });
    }
  }
});



module.exports = router;
