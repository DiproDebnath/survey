const express = require("express");
const router = express.Router();
const choiceController = require("../controllers/choiceController")

router.get("/", choiceController.getAllChoice);

router.post("/create", choiceController.createChoice);

module.exports = router;
