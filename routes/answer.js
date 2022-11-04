const express = require("express");
const router = express.Router();
const { Answer } = require("../models");


router.post("/", async (req, res) => {
  try {
    const answer = await Answer.create({
      answer: req.body.answer,
      question_id : req.body.question_id,
    });

    res.json(answer);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});

module.exports = router;
