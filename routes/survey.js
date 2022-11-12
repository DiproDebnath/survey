const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/surveyController");


router.get("/", surveyController.getAllSurvey);

router.get("/result/:id", surveyController.getResultById);
      
router.get("/:id", surveyController.getSurveyById);
      
router.post("/create", surveyController.createSurvey);

router.put("/update/:id", surveyController.updateSurveyById);

module.exports = router;
