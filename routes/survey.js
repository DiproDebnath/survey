const express = require("express");
const router = express.Router();
const { Survey, Question, Answer } = require("../models");

router.get("/", async (req, res) => {
  try {
    const survey = await Survey.findAll({
      include: Question,
    });
    res.json(survey);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/result/:id", async (req, res) => {
  try {
    let survey = await Survey.findOne({
      where: { id: req.params.id },
      include: [{ model: Question, include: Answer }],
    });
    survey = survey == null ? { message: "No Survey found" } : survey;
    res.json(survey);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let survey = await Survey.findOne({
      where: { id: req.params.id },
      include: Question,
    });
    survey = survey == null ? { message: "No Survey found" } : survey;
    res.json(survey);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/create", async (req, res) => {
  try {
    const survey = await Survey.create({
      name: req.body.name,
    });

    res.json(survey);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/update/:id", async (req, res) => {
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
});

module.exports = router;
