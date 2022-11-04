const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const surveyRouter = require("./routes/index");

app.use("/survey", surveyRouter);

app.listen(3000);
