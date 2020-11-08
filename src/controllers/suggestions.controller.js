const logger = require("../../config/winston");
const suggestionDb = require("../db/suggestions.db");
const questionDb = require("../db/questions.db");
const validator = require("./suggestions.validator");

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

module.exports = {
  insertNewSuggestion,
  validateSuggestion,
};
