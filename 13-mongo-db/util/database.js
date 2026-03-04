const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const MONGO_URL =
  "mongodb+srv://newton:newton@airbnb.cidzwvf.mongodb.net/?appName=airbnb";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error when connecting mongo ", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Mongo not connect");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
