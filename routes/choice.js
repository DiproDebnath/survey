const express = require("express");
const router = express.Router();
const { Question, Choice } = require("../models");

router.get("/", async (req, res) => {
  try {
    const choice = await Choice.findAll();

    res.json(choice);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const question = await Question.findOne({ where: req.body.questionId });
    if (question.questionTypeId == 1) {
      throw { errors: [{ message: "Question type is single" }] };
    }
    const choiceItem = req.body.choice.map((item) => {
      return { questionId: req.body.questionId, choice: item };
    });
    const choices = await Choice.bulkCreate(choiceItem);

    res.json(choices);
  } catch (err) {
    console.log(err);
    if (err.errors) {
      res.json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports = router;
