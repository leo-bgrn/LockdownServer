const { ObjectId } = require("mongodb");
const db = require("../../db/db");

describe("db query", () => {
  xtest("query all db should returns something", async () => {
    const res = await db.queryList("questions", {});
    expect(Array.isArray(res)).toBe(true);
  });
  xtest("query one should returns something", async () => {
    const res = await db.query("questions", {
      _id: ObjectId("5fa193b693595a09cca8fdbb"),
    });
    expect(Array.isArray(res)).toBe(false);
  });
  xtest("aggregate should returns something", async () => {
    const res = await db.connect("questions", db.aggregate, 2);
    expect(Array.isArray(res)).toBe(true);
  });
});
