const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "myDatabase";

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db(dbName);
  }
  return db;
}

module.exports = connectDB;