const express = require("express");
const router = express.Router();
const { Question } = require("../models");

router.get("/", async (req, res) => {
  try {
    const question = await Question.findAll({include: [ 'QuestionType']});
   
    res.json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});
router.get("/:id", async (req, res) => {
  try {
    let question = await Question.findOne({ where: { id: req.params.id } });
    question = question == null ? { message: "No Question found" } : question;
    res.json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});
router.post("/create", async (req, res) => {
  try {
    const question = await Question.create({
      question: req.body.question,
      survey_id: req.body.survey_id,
      question_type_id: req.body.question_type_id,
    });

    res.json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});
router.put("/update/:id", async (req, res) => {
  const updateData  = {};
  if(req.body.question) updateData.question = req.body.question
  if(req.body.survey_id) updateData.survey_id = req.body.survey_id
  if(req.body.question_type_id) updateData.question_type_id = req.body.question_type_id

  try {
    await Question.update(
      updateData,
      {
        where: { id: req.params.id },
      }
    );
    const question = await Question.findOne({ where: { id: req.params.id } });
    res.json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});

module.exports = router;
