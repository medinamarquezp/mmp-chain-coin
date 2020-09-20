const { v4: uuidV4 } = require("uuid");

class Uuid {
  static generate() {
    return uuidV4();
  }
}

module.exports = Uuid;
