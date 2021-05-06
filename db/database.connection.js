import dbConfig from "../config/database.config";
import mongoose from "mongoose";

mongoose.Promise = require("bluebird");

console.log(dbConfig);

export function initDb() {
  mongoose.connect(dbConfig.url, dbConfig.options);
  mongoose.connection.on("error", (err) => {
    console.info(`MongoDB connection error: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
  });

  mongoose.connection.on("connected", () => {
    console.info("Mongoose connected to", dbConfig.url);
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
}

export default {
  initDb,
};
