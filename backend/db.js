const { MongoClient } = require("mongodb");

let dbConnection;
const connectionString = process.env.MONGODB_URI;

module.exports = {
  connectToDataBase: (cb) => {
    console.log(`Connecting to MongoDB at ${connectionString}...`);
    MongoClient.connect(connectionString)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDataBase: () => {
    return dbConnection;
  },
};
