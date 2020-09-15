const { v1: uuidV1 } = require("uuid");

class Uuid {
  static generate() {
    return uuidV1();
  }
}

module.exports = Uuid;
