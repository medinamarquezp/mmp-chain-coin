const env = process.env.NODE_ENV || "development";
let configFile;

switch (env) {
  case "development":
    configFile = require("./dev.config");
    break;
  case "test":
    configFile = require("./test.config");
    break;
  default:
    configFile = require("./dev.config");
    break;
}

module.exports = configFile;
