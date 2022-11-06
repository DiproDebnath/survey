const express = require("express");
const router = express.Router();
const { sequelize, Answer, AnswerChoice } = require("../models");

router.post("/", async (req, res) => {
  try {
    const answer = await Answer.create({
      answer: req.body.answer,
      questionId: req.body.questionId,
    });

    res.json(answer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/choice", async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const answer = await Answer.create({
      questionId: req.body.questionId,
    }, { transaction: t });
    const choiceItem = req.body.choice.map((item) => {
      return { answerId: answer.id, choiceId: item };
    });
    console.log(choiceItem);
    const answerChioce = await AnswerChoice.bulkCreate(choiceItem, { transaction: t });
    await t.commit();
    res.json(answerChioce);
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
