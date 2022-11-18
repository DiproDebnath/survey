const express = require("express");
const app = express();
const { sequelize } = require("./models");

const authController = require("./controllers/authController");
const middleware = require('./middleware');
const { captureError } = require("./utils/helper");


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json("Survey Project");
});

app.post("/signin", middleware.requestValidator("user", "loginUser"), captureError(authController.signIn));





const surveyRouter = require("./routes/survey");
const questionRouter = require("./routes/question");
const ChoiceRouter = require("./routes/Choice");
const answerRouter = require("./routes/answer");



app.use("/survey", surveyRouter);
app.use("/question", questionRouter);
app.use("/choice", ChoiceRouter);
app.use("/answer", answerRouter);

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.status && err.status !== 500) {
    return res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }
  res.status(500);
  res.json({
    error: {
      status: 500,
      message: "Internal server error",
    },
  });
});

app.listen({ port: 3000 }, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
