let MongoClient = require("mongodb").MongoClient;

const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

async function queryList(collection, args) {
  try {
    let client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let connection = await client.connect();

    try {
      const res = await connection
        .db(dbName)
        .collection(collection)
        .find(args)
        .toArray();
      return res;
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

async function query(collection, args) {
  try {
    let client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let connection = await client.connect();

    try {
      const res = await connection
        .db(dbName)
        .collection(collection)
        .findOne(args);
      return res;
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

async function aggregate(collection, number) {
  try {
    let client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let connection = await client.connect();

    try {
      const res = await connection
        .db(dbName)
        .collection(collection)
        .aggregate([{ $sample: { size: number } }])
        .toArray();
      return res;
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

module.exports = { query, queryList, aggregate };
