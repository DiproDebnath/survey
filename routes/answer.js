const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");
const middleware = require("../middleware");
const { captureError } = require("../utils/helper");

router.post(
  "/",
  middleware.requestValidator("answer", "addAnswer"),
  captureError(answerController.createAnswer)
);

module.exports = router;
