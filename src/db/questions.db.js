const { ObjectId } = require("mongodb");
const db = require("./db");
const collection = "questions";

async function getAllQuestions() {
  const questions = await db.connect(collection, db.queryList, {});
  return questions;
}

async function getQuestionById(id) {
  const question = await db.connect(collection, db.query, {
    id_: ObjectId(id),
  });
  return question;
}

async function getRandomQuestions(size) {
  const questions = await db.connect(collection, db.aggregate, size);
  return questions;
}

async function insertQuestion(question) {
  await db.connect(collection, db.insertOne, question);
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  getRandomQuestions,
  insertQuestion,
};
