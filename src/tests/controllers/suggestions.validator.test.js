const suggestionsValidator = require("../../controllers/suggestions.validator");

describe("Validation Object", () => {
  test("validate object should validate a text question / plaintext answer suggestion", () => {
    const testObject = {
      question: {
        type: "text",
        content: "My Question ?",
      },
      answer: {
        type: "plaintext",
        answers: ["My Answer"],
      },
    };
    const res = suggestionsValidator.validateObject(testObject);
    expect(res).toEqual(testObject);
  });
  test("validate object should validate a text question / plaintextMultipleValue answer suggestion", () => {
    const testObject = {
      question: { type: "text", content: "My text question ?" },
      answer: {
        type: "plaintextMultipleValue",
        answers: [["Halliday", "Johny Halliday"], ["Pitbull"]],
      },
    };
    const res = suggestionsValidator.validateObject(testObject);
    expect(res).toEqual(testObject);
  });
  test("validate object should validate a text question / checkbox answer suggestion", () => {
    const testObject = {
      question: { type: "text", content: "My text question ?" },
      answer: {
        type: "checkbox",
        options: ["checkbox10", "checkbox20", "checkbox30"],
        answers: [0, 2],
      },
    };
    const res = suggestionsValidator.validateObject(testObject);
    expect(res).toEqual(testObject);
  });
  test("validate object should validate a textWithImage question / radio answer suggestion", () => {
    const testObject = {
      question: {
        type: "textWithImage",
        content: "My text question ?",
        source:
          "https://static.vecteezy.com/system/resources/thumbnails/000/246/312/original/mountain-lake-sunset-landscape-first-person-view.jpg",
      },
      answer: {
        type: "radio",
        options: ["radioCheck1", "radioCheck2", "radioCheck3"],
        answers: 2,
      },
    };
    const res = suggestionsValidator.validateObject(testObject);
    expect(res).toEqual(testObject);
  });
});
