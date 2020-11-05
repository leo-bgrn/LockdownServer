const { ObjectId } = require("mongodb");
const db = require("./db");
const collection = "suggestions";

async function insertSuggestion(suggestion) {
  await db.connect(collection, db.insertOne, suggestion);
}

async function deleteSuggestionById(id) {
  await db.connect(collection, db.deleteQuery, {
    _id: ObjectId(id),
  });
}

async function getAllSuggestions() {
  const suggestions = await db.connect(collection, db.queryList, {});
  return suggestions;
}

async function getSuggestionById(id) {
  const suggestion = await db.connect(collection, db.query, {
    _id: ObjectId(id),
  });
  return suggestion;
}

async function getRandomSuggestions(size) {
  const suggestions = await db.connect(collection, aggregate, size);
  return suggestions;
}

module.exports = {
  getAllSuggestions,
  getSuggestionById,
  getRandomSuggestions,
  insertSuggestion,
  deleteSuggestionById,
};
