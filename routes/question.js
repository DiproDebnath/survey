const e = require("express");
const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController")

router.get("/", questionController.getAllQuestion);
router.get("/:id", questionController.getQuestionById);
router.post("/create", questionController.createQuestion );
router.put("/update/:id", questionController.updateQuestion);

module.exports = router;
