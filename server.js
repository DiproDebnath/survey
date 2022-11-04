const express = require("express");
const app = express();
const { sequelize } = require("./models");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const surveyRouter = require("./routes/survey");
const questionRouter = require("./routes/question");
const questionTypeRouter = require("./routes/questionType");
const answerRouter = require("./routes/answer");

app.use("/survey", surveyRouter);
app.use("/question", questionRouter);
app.use("/question_type", questionTypeRouter);
app.use("/answer", answerRouter);

app.listen({ port: 3000 }, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }      
});
