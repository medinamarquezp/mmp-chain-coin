const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY } = require("@config");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  static genesis() {
    return new this("Genesis time", "0".repeat(64), "0".repeat(64), [], 0);
  }

  static mine(lastBlock, data) {
    let hash, timestamp;
    let nonce = 0;
    const lastHash = lastBlock.hash;
    do {
      nonce++;
      timestamp = Date.now();
      hash = this.hash(timestamp, lastHash, data, nonce);
      console.log(hash);
    } while (hash.substring(0, DIFFICULTY) != "0".repeat(DIFFICULTY));

    return new this(timestamp, lastHash, hash, data, nonce);
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block;
    return this.hash(timestamp, lastHash, data, nonce);
  }

  toString() {
    return `BLOCK:
            Timestamp: ${this.timestamp}
            Las hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}
            Nonce: ${this.nonce}`;
  }
}

module.exports = Block;
