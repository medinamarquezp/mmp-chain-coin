const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this("Genesis time", "0".repeat(64), "0".repeat(64), []);
  }

  static mine(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = this.hash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return this.hash(timestamp, lastHash, data);
  }

  toString() {
    return `BLOCK:
            Timestamp: ${this.timestamp}
            Las hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}`;
  }
}

module.exports = Block;
