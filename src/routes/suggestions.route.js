let express = require("express");
let router = express.Router();
const suggestionsDb = require("../db/suggestions.db");
const suggestionController = require("../controllers/suggestions.controller");

router.get("/", async function (req, res, next) {
  try {
    const suggestions = await suggestionController.getAllSuggestions();
    res.send(suggestions);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const suggestion = await suggestionController.getSuggestionById(id);
    res.send(suggestion);
  } catch (e) {
    next(e);
  }
});

router.get("/random/:nbrOfQuestion", async function (req, res, next) {
  try {
    const nbrOfQuestion = Number(req.params.nbrOfQuestion);
    const suggestions = await suggestionController.getRandomSuggestions(
      nbrOfQuestion
    );
    res.send(suggestions);
  } catch (e) {
    next(e);
  }
});

router.post("/", async function (req, res, next) {
  try {
    await suggestionController.insertNewSuggestion(req.body);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});

router.post("/validate/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    await suggestionController.validateSuggestion(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    await suggestionsDb.deleteSuggestionById(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
