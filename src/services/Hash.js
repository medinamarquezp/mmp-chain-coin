const SHA256 = require("crypto-js/sha256");
const bcrypt = require("bcrypt");

class Hash {
  static salt = 10;

  static sha256(data) {
    return SHA256(data).toString();
  }

  static async password(plainPassword) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(plainPassword, Hash.salt);
    } catch (err) {
      throw new Error(`Error on hashing plain passowrd, ${err}`);
    }
    return hashedPassword;
  }

  static async compare(plainPassword, hash) {
    let resultComparison;
    try {
      resultComparison = await bcrypt.compare(plainPassword, hash);
    } catch (err) {
      throw new Error(`Error on comparing plain password to hash, ${err}`);
    }
    return resultComparison;
  }
}

module.exports = Hash;
