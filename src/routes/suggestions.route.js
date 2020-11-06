let express = require("express");
let router = express.Router();
const suggestionsDb = require("../db/suggestions.db");
const suggestionController = require("../controllers/suggestions.controller");

router.get("/", async function (req, res, next) {
  try {
    const suggestions = await suggestionsDb.getAllSuggestions();
    res.send(suggestions);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const suggestion = await suggestionsDb.getSuggestionById(id);
    res.send(suggestion);
  } catch (e) {
    next(e);
  }
});

router.get("/:nbrOfQuestion", async function (req, res, next) {
  try {
    const nbrOfQuestion = req.params.nbrOfQuestion;
    const suggestions = await suggestionsDb.getRandomSuggestions(nbrOfQuestion);
    res.send(suggestions);
  } catch (e) {
    next(e);
  }
});

router.post("/", async function (req, res, next) {
  try {
    suggestionController.insertNewSuggestion(req.body);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

router.post("/validate/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    suggestionController.validateSuggestion(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
