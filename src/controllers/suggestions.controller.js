const logger = require("../../config/winston");
const suggestionDb = require("../db/suggestions.db");
const questionDb = require("../db/questions.db");
const validator = require("./suggestions.validator");
const questionsController = require("./questions.controller");

async function insertNewSuggestion(object) {
  try {
    const formattedObject = validator.validateObject(object);
    await suggestionDb.insertSuggestion(formattedObject);
  } catch (e) {
    logger.error(`Unable to validate suggestion object : ${e.message}`, object);
    throw new Error(`Unable to validate suggestion object : ${e.message}`);
  }
}

async function validateSuggestion(id) {
  let suggestion = await suggestionDb.getSuggestionById(id);
  delete suggestion._id;
  await questionDb.insertQuestion(suggestion);
  await suggestionDb.deleteSuggestionById(id);
}

async function getAllSuggestions() {
  const suggestions = await suggestionDb.getAllSuggestions();
  return suggestions.map((suggestion) =>
    questionsController.questionToRoundAndAnswer(suggestion)
  );
}

async function getRandomSuggestions(number) {
  const suggestions = await suggestionDb.getRandomSuggestions(number);
  return suggestions.map((suggestion) =>
    questionsController.questionToRoundAndAnswer(suggestion)
  );
}

async function getSuggestionById(id) {
  const suggestion = await suggestionDb.getSuggestionById(id);
  return questionsController.questionToRoundAndAnswer(suggestion);
}

module.exports = {
  insertNewSuggestion,
  validateSuggestion,
  getAllSuggestions,
  getRandomSuggestions,
  getSuggestionById,
};
