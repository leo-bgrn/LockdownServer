let express = require("express");
let router = express.Router();
const questionsDb = require("../db/questions.db");

router.get("/", async function (req, res, next) {
  try {
    const questions = await questionsDb.getAllQuestions();
    res.send(questions);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const question = await questionsDb.getQuestionById(id);
    res.send(question);
  } catch (e) {
    next(e);
  }
});

router.get("/game/:nbrOfQuestion", async function (req, res, next) {
  try {
    const nbrOfQuestion = req.params.nbrOfQuestion;
    const questions = await questionsDb.getRandomQuestions(nbrOfQuestion);
    res.send(questions);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
