const express = require("express");
const router = express.Router();
const { Choice } = require("../models");

router.get("/", async (req, res) => {
  try {
    const choice = await Choice.findAll();
   
    res.json(choice);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});


router.post("/create", async (req, res) => {
  try {
    const choice = await Choice.create({
      choice: req.body.choice,
      questionId: req.body.questionId,
    });

    res.json(choice);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
});

module.exports = router;
