const express = require("express");
const router = express.Router();
const choiceController = require("../controllers/choiceController");
const middleware = require("../middleware");
const { captureError } = require("../utils/helper");

router.get("/", captureError(choiceController.getAllChoice));

router.post(
  "/create",
  middleware.verifyAuth,
  middleware.requestValidator("choice", "addChoice"),
  captureError(choiceController.createChoice)
);

module.exports = router;
