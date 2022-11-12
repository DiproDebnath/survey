const express = require("express");
const router = express.Router();
const questionTypeController = require("../controllers/questionTypeController");

router.get("/", questionTypeController.getAllQuestionType);
router.get("/:id", questionTypeController.getQuestionTypeById);
router.post("/create", questionTypeController.createQuestionType);
router.put("/update/:id", questionTypeController.updateQuestionType);

module.exports = router;
