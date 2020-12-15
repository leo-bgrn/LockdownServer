function questionToRoundAndAnswer(question) {
  let resRound = {
    id: question._id,
    question: question.question,
    answer: {
      type: question.answer.type,
    },
  };
  if (question.answer.options != null) {
    resRound.answer.options = question.answer.options;
  }

  let resAnswer = {
    id: question._id,
    answers: question.answer.answers,
    explanation: question.answer.explanation != null ? question.answer.explanation : ''
  };

  return { round: resRound, answer: resAnswer };
}

module.exports = {
  questionToRoundAndAnswer,
};
