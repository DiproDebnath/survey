const express = require("express");
const router = express.Router();
const middleware = require('../middleware');
const surveyController = require("../controllers/surveyController");
const { captureError } = require("../utils/helper");



router.get("/", captureError(surveyController.getAllSurvey));

router.get("/result/:id", captureError(surveyController.getResultById));
 

router.get("/:id", captureError(surveyController.getSurveyById));
      
router.post("/create",[ middleware.verifyAuth, middleware.validator('survey', 'addSurvey')], captureError(surveyController.createSurvey));

router.put("/update/:id", middleware.validator('survey', 'updateSurvey'), captureError(surveyController.updateSurveyById));

module.exports = router;
