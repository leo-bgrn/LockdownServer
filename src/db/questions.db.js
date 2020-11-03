const { ObjectId } = require("mongodb");
const db = require("./db");

async function getAllQuestions() {
  const questions = await db.queryList("questions", {});
  return questions;
}

async function getQuestionById(id) {
  const question = await db.query("questions", { id_: ObjectId(id) });
  return question;
}

async function getRandomQuestions(size) {
  const questions = await db.aggregate("questions", size);
  return questions;
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  getRandomQuestions,
};
