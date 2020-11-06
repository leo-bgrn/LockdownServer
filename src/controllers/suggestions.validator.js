function validateObject(object) {
  const question = validateQuestion(object.question);
  const answer = validateAnswer(object.answer);
  return { question: question, answer: answer };
}

function validateQuestion(question) {
  switch (question.type) {
    case "text":
      return validateTextQuestion(question);
    case "textWithImage":
      return validateTextWithImageQuestion(question);
    default:
      throw new Error(`Question type ${question.type} is not known`);
  }
}

function validateTextQuestion(question) {
  checkFieldIsStringAndNotEmpty(
    question.content,
    "content",
    "text",
    "question"
  );
  return { type: question.type, content: question.content };
}

function validateTextWithImageQuestion(question) {
  checkFieldIsStringAndNotEmpty(
    question.content,
    "content",
    "textWithImage",
    "question"
  );
  checkFieldIsStringAndNotEmpty(
    question.source,
    "source",
    "textWithImage",
    "question"
  );
  return {
    type: question.type,
    content: question.content,
    source: question.source,
  };
}

function validateAnswer(answer) {
  switch (answer.type) {
    case "plaintext":
      return validatePlainTextAnswer(answer);
    case "plaintextMultipleValue":
      return validatePlainTextMultipleValueAnswer(answer);
    case "checkbox":
      return validateCheckboxAnswer(answer);
    case "radio":
      return validateRadioAnswer(answer);
    default:
      throw new Error(`Answer type ${answer.type} is not known`);
  }
}

function validatePlainTextAnswer(answer) {
  checkFieldIsArrayOfString(answer.answers, "answers", "plaintext", "answer");
  return { type: answer.type, answers: answer.answers };
}

function validatePlainTextMultipleValueAnswer(answer) {
  checkFieldIsArrayOfArrayString(
    answer.answers,
    "answers",
    "plaintextMultipleValue",
    "answer"
  );
  return { type: answer.type, answers: answer.answers };
}

function validateCheckboxAnswer(answer) {
  checkFieldIsArrayOfString(answer.options, "options", "checkbox", "answer");
  checkFieldIsArrayOfInteger(answer.answers, "answers", "checkbox", "answer");
  if (!answer.answers.every((element) => element < answer.options.length)) {
    throw new Error(
      `'answers' field cannot include numbers greater than the number of answer in 'options'`
    );
  }
  return {
    type: answer.type,
    options: answer.options,
    answers: answer.answers,
  };
}

function validateRadioAnswer(answer) {
  checkFieldIsArrayOfString(answer.options, "options", "radio", "answer");
  checkFieldIsInteger(answer.answers, "answers", "radio", "answer");
  if (answer.answers >= answer.options.length) {
    throw new Error(
      `'answers' field cannot be a number greater than the number of answer in 'options'`
    );
  }
  return {
    type: answer.type,
    options: answer.options,
    answers: answer.answers,
  };
}

function checkFieldIsStringAndNotEmpty(
  field,
  fieldName,
  type,
  questionOrAnswer
) {
  if (!field) {
    throw new Error(
      `'${fieldName}' field must be present for a '${type}' ${questionOrAnswer}`
    );
  }
  if (typeof field != "string") {
    throw new Error(
      `'${fieldName}' field must be a string for a '${type}' ${questionOrAnswer}`
    );
  }
  if (field.trim() === "") {
    throw new Error(
      `'${fieldName}' cannot be empty for a '${type}' ${questionOrAnswer}`
    );
  }
}

function checkFieldIsInteger(field, fieldName, type, questionOrAnswer) {
  if (!field) {
    throw new Error(
      `'${fieldName}' field must be present for a '${type}' ${questionOrAnswer}`
    );
  }
  if (!Number.isInteger(field)) {
    throw new Error(
      `'${fieldName}' field must be an Integer for a '${type}' ${questionOrAnswer}`
    );
  }
}

function checkFieldIsArrayOfString(field, fieldName, type, questionOrAnswer) {
  if (!field) {
    throw new Error(
      `'${fieldName}' field must be present for a '${type}' ${questionOrAnswer}`
    );
  }
  if (!Array.isArray(field)) {
    throw new Error(
      `'${fieldName}' field must be an Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (field.length < 1) {
    throw new Error(
      `'${fieldName}' field cannot be an empty Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (
    !field.every(
      (element) => typeof element === "string" && element.trim() !== ""
    )
  ) {
    throw new Error(
      `Every elements in '${fieldName}' field must be a string for a '${type}' ${questionOrAnswer}`
    );
  }
}

function checkFieldIsArrayOfArrayString(
  field,
  fieldName,
  type,
  questionOrAnswer
) {
  if (!field) {
    throw new Error(
      `'${fieldName}' field must be present for a '${type}' ${questionOrAnswer}`
    );
  }
  if (!Array.isArray(field)) {
    throw new Error(
      `'${fieldName}' field must be an Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (field.length < 1) {
    throw new Error(
      `'${fieldName}' field cannot be an empty Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (
    !field.every(function (element) {
      return (
        Array.isArray(element) &&
        element.length > 0 &&
        element.every((el) => typeof el === "string" && el.trim() !== "")
      );
    })
  ) {
    throw new Error(
      `Every elements in '${fieldName}' field must be an Array of string for a '${type}' ${questionOrAnswer}`
    );
  }
}

function checkFieldIsArrayOfInteger(field, fieldName, type, questionOrAnswer) {
  if (!field) {
    throw new Error(
      `'${fieldName}' field must be present for a '${type}' ${questionOrAnswer}`
    );
  }
  if (!Array.isArray(field)) {
    throw new Error(
      `'${fieldName}' field must be an Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (field.length < 1) {
    throw new Error(
      `'${fieldName}' field cannot be an empty Array for a '${type}' ${questionOrAnswer}`
    );
  }
  if (!field.every((element) => Number.isInteger(element))) {
    throw new Error(
      `Every elements in '${fieldName}' field must be an Integer for a '${type}' ${questionOrAnswer}`
    );
  }
}

module.exports = {
  validateObject,
};
