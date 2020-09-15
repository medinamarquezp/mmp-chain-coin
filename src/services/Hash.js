const SHA256 = require("crypto-js/sha256");

class Hash {
  static create(data) {
    return SHA256(data).toString();
  }
}

module.exports = Hash;
