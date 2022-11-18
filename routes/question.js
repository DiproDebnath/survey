const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const { captureError } = require("../utils/helper");
const questionController = require("../controllers/questionController");

router.get("/", captureError(questionController.getAllQuestion));

router.get("/:id", captureError(questionController.getQuestionById));

router.post(
  "/create",
  middleware.verifyAuth,
  middleware.requestValidator("question", "addQuestion"),
  captureError(questionController.createQuestion)
);

router.put(
  "/update/:id",
  middleware.verifyAuth,
  middleware.requestValidator("question", "updateQuestion"),
  captureError(questionController.updateQuestion)
);

module.exports = router;
