const { ObjectId } = require("mongodb");
const db = require("../../db/db");

describe("db query", () => {
  test("query all db should returns something", async () => {
    const res = await db.queryList("questions", {});
    expect(Array.isArray(res)).toBe(true);
  });
  test("query one should returns something", async () => {
    const res = await db.query("questions", {
      _id: ObjectId("5fa193b693595a09cca8fdbb"),
    });
    expect(Array.isArray(res)).toBe(false);
  });
});
