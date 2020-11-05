let MongoClient = require("mongodb").MongoClient;

const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

async function connect(collection, callback, param) {
  try {
    let client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let connection = await client.connect();

    try {
      return await callback(connection, collection, param);
    } catch (error) {
      throw error;
    } finally {
      client.close();
    }
  } catch (e) {
    console.log("Unable to get results from MongoDB : ", e);
    throw e;
  }
}

async function queryList(connection, collection, args) {
  const res = await connection
    .db(dbName)
    .collection(collection)
    .find(args)
    .toArray();
  return res;
}

async function query(connection, collection, args) {
  const res = await connection.db(dbName).collection(collection).findOne(args);
  return res;
}

async function aggregate(connection, collection, number) {
  const res = await connection
    .db(dbName)
    .collection(collection)
    .aggregate([{ $sample: { size: number } }])
    .toArray();
  return res;
}

async function insertOne(connection, collection, object) {
  await connection.db(dbName).collection(collection).insertOne(object);
}

async function deleteQuery(connection, collection, query) {
  await connection.db(dbName).collection(collection).deleteOne(query);
}

module.exports = {
  query,
  queryList,
  aggregate,
  insertOne,
  deleteQuery,
  connect,
};
